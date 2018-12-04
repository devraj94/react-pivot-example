var React = require('react');
var ReactPivot = require('react-pivot');
var createReactClass = require('create-react-class');

var rows = require('./data.json');



class Report extends React.Component {

  constructor(props){
    super(props);
    
    this.state = {
    	
    }



	this.calculations = [
	  {
	    title: 'Impressions', value: 'impressionsCount',
	    template: function(val, row) {
	      return val
	    },
	    sortBy: function(row) {
	      return isNaN(row.impressionsCount) ? 0 : row.impressionsCount
	    }
	  },
	  {
	    title: 'Loads', value: 'loadsCount',
	    template: function(val, row) {
	      return val
	    },
	    sortBy: function(row) {
	      return isNaN(row.loadsCount) ? 0 : row.loadsCount
	    }
	  },
	  {
	    title: 'Displays', value: 'displaysCount',
	    template: function(val, row) {
	      return val
	    },
	    sortBy: function(row) {
	      return isNaN(row.displaysCount) ? 0 : row.displaysCount
	    }
	  },
	  {
	    title: 'Load Rate', value: 'loadRate',
	    template: function(val, row) {
	      return val+'%'
	    },
	    sortBy: function(row) {
	      return isNaN(row.loadRate) ? 0 : row.loadRate
	    }
	  },
	  {
	    title: 'Display Rate', value: 'displayRate',
	    template: function(val, row) {
	      return val+'%'
	    },
	    sortBy: function(row) {
	      return isNaN(row.displayRate) ? 0 : row.displayRate
	    }
	  }
	];

	this.dimensions = [
		{value: 'date', title: 'Date'},
			{value: 'host', title: 'Host'}
	];



    this.reduce = (row, memo) => {
	  memo.impressionsCount = (memo.impressionsCount || 0) + (row.type === 'impression' ? 1 : 0);
	  memo.loadsCount = (memo.loadsCount || 0) + (row.type === 'load' ? 1 : 0);
	  memo.displaysCount = (memo.displaysCount || 0) + (row.type === 'display' ? 1 : 0);
	  memo.loadRate = (
	  		((!memo.impressionsCount && !memo.loadsCount) || !memo.loadsCount) ? 0 : 
	  			(!memo.impressionsCount ? 100 : (parseFloat(memo.loadsCount / memo.impressionsCount).toFixed(1)))
	  	);
	  memo.displayRate = (
	  		((!memo.loadsCount && !memo.displaysCount) || !memo.displaysCount) ? 0 : 
	  			(!memo.loadsCount ? 100 : (parseFloat(memo.displaysCount / memo.loadsCount).toFixed(1)))
	  	);
	  return memo;
	}

  }


  render() {

  	return  (
  		<ReactPivot rows={rows}
              dimensions={this.dimensions}
              reduce={this.reduce}
              calculations={this.calculations}
              activeDimensions={['Date', 'Host']}
        >
        </ReactPivot>
    );
  }
}


module.exports = Report;