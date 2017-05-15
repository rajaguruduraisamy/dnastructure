import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import * as _ from 'lodash';

import './Graph.scss';

// *****************************************************
// ** Graph component
// *****************************************************

export default class Graph extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      width: 960,
      height: 500,
      sequence: '',
      dotNotation: ''
    };

    // mouse event vars
    this.newSource = null;
    this.newTarget = null;

    // init force layout
    this.force = d3.layout.force()
    .size([this.state.width, this.state.height])
    .linkDistance(50)
    .charge(-200);

    this.nodes = this.force.nodes();
    this.links = this.force.links();
    this.node = null;
    this.link = null;
  }

  graphInit() {
    this.vis = d3.select(ReactDOM.findDOMNode(this.refs.graph));

    this.vis
    .call(d3.behavior.zoom().scaleExtent([1, 10]).on("zoom", this.rescale.bind(this)))
    .on("dblclick.zoom", null)
    .append('rect')
    .attr('width', this.state.width)
    .attr('height', this.state.height)
    .attr('fill', 'white');

    this.force.on('tick', this.tick.bind(this));
    //window.addEventListener("resize", this.resize.bind(this));
  }

  tick() {
    this.vis.selectAll(".link").attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

    this.vis.selectAll(".node").attr("transform", (d) => "translate(" + d.x + "," + d.y + ")");  
  }

  rescale() {
    this.vis.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
  }

  dragstart(d) {
    d3.select(this).classed("fixed", d.fixed = true);
  }

  resize() {
    this.vis = d3.select(ReactDOM.findDOMNode(this.refs.graph));
    //this.force.size([this.vis.offsetWidth, this.vis.offsetHeight]).resume();
  }

  createLink(d) {
    if(!this.newSource) {
      this.newSource = d;
    } else if(this.newSource != d) {
      this.newTarget = d;
      if (this.newTarget.index < this.newSource.index) {
        let temp = this.newSource;
        this.newSource = this.newTarget;
        this.newTarget = temp;
      }
      this.links.push({source: this.newSource, target: this.newTarget, bond: 2, key: this.newSource.key + '-' + this.newTarget.key});

      this.vis.selectAll(".link").data(this.links)
      .enter().insert('line', '.node')
      .classed('link', true)
      .classed('bond', (d) => d.bond === 2)
      .on('dblclick', this.deleteLink.bind(this));
      this.vis.selectAll(".link").data(this.links).exit().remove();

      this.force.start();

      let dotNotation = this.updateDotNotation(this.state.dotNotation, this.newSource, this.newTarget, true); 
      this.setState({dotNotation});
      this.newSource = null;
      this.newTarget = null;
      this.props.actions.updateStructure(this.state.sequence, dotNotation);

    }
  }

  updateDotNotation(dotNotation, source, target, insert) {
    
    return dotNotation.split('').reduce((acc, d, i) => {
      if (i === source.index) {
        if (insert) {
          return acc + '(';
        } else {
          return acc + '.'
        }
      } else if (i === target.index) {
        if (insert) {
          return acc + ')';
        } else {
          return acc + '.'
        }
      } else {
        return acc + d;
      }
    }, '');
  }

  deleteLink(d) {
    
    if (d.bond !== 2) {
      return;
    }

    let deletedLink = this.links.splice(this.links.lastIndexOf(d), 1);

    this.vis.selectAll(".link").data(this.links)
      .enter().insert('line', '.node')
      .classed('link', true)
      .classed('bond', (d) => d.bond === 2)
      .on('dblclick', this.deleteLink.bind(this));
      this.vis.selectAll(".link").data(this.links).exit().remove();

      this.force.start();

      let dotNotation = this.updateDotNotation(this.state.dotNotation, deletedLink[0].source, deletedLink[0].target, false); 
      this.setState({dotNotation});

      this.props.actions.updateStructure(this.state.sequence, dotNotation);
  }

  redraw(sequence, dotNotation) {
    let newNodes = sequence.split('').map((v, i) => {
      return {
        key: i+''+v,
        atom: v,
        size: 10
      }

    });

    let newLinks = [];

    //construct phosphate links
    for (let i=1;i< newNodes.length;i++) {
      newLinks.push({source: i-1, target: i, bond: 1, key: i-1 + '-' + i});
    }

    //construct molecule links
    let notationArray = dotNotation.split('');
    let stack = [];
    let moleculeLinks = [];

    notationArray.forEach((element, index) => {
      if (element === '(') {
        stack.push(index);
      } else if (element === ')') {
        let source = stack.pop();
        moleculeLinks.push({source, target: index, bond: 2, key: source + '-' + index});
      }

      }
    );

    Array.prototype.push.apply(newLinks, moleculeLinks);
    
    this.node = this.vis.selectAll(".node").data(newNodes, (d) => d.key);
    this.link = this.vis.selectAll(".link").data(newLinks, (d) => d.key);

    this.link.enter().insert('line', '.node')
    .classed('link', true)
    .classed('bond', (d) => d.bond === 2)
    .on('dblclick', this.deleteLink.bind(this));
    this.link.exit().remove();

    let nodeGroup = this.node.enter()
    .insert('g')
    .classed('node', true)
    .on('dblclick', this.createLink.bind(this))
    .call(this.force.drag().on("dragstart", this.dragstart));
    
    nodeGroup.insert('circle')
    .attr('r', 10);
    
    nodeGroup.insert('text')
    .attr("text-anchor", "middle")
    .attr("dy", ".35em")
    .text((d) => d.atom);

    this.node.exit().remove();

    this.force.nodes(newNodes).links(newLinks);
    this.links = this.force.links();
    this.nodes = this.force.nodes();

    if (d3.event) {
      // prevent browser's default behavior
      d3.event.preventDefault();
    }

    this.force.start(); 
    this.resize(); 
  }

  updateStyling(props) {
    this.vis.selectAll("circle")
     .attr('fill', (d) => {
        switch (d.atom) {
          case 'A' : {return props.structure.colorA};
          case 'C' : {return props.structure.colorC};
          case 'G' : {return props.structure.colorG};
          case 'T' : {return props.structure.colorT};
          default : {return 'black'};
        }
    }).attr('r', props.structure.baseSize);

    this.force.linkDistance((d) => d.bond === 1 ? props.structure.linkWidth : props.structure.bondWidth);
    this.force.start();
  }

  componentDidMount() {
    this.graphInit();
    this.shouldComponentUpdate(this.props);
  }

  componentWillUnmount() {
    //window.removeEventListener("resize", this.resize.bind(this));
  }

  shouldComponentUpdate(nextProps) {
    
    let sequence = nextProps.structure.sequence;
    let dotNotation = nextProps.structure.dotNotation;

    //This is to avoid redraw when we create link inside the graph
    if (this.state.sequence !== sequence && this.state.dotNotation !== dotNotation) {
      this.setState({sequence, dotNotation});
      this.redraw(sequence, dotNotation);
    }

    this.updateStyling(nextProps);
    
    return false;
  }

  render() {
    return (
      <div className="graph-container">
      <svg className="graph">
        <g ref="graph">
        </g>
      </svg>
      </div>
    );
  }
}