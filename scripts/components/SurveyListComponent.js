var React = require('react');
var ThoughtModel = require('../models/ThoughtModel');

module.exports = React.createClass({
  getInitialState: function() {
      return {
          thought: []
      };
  },
  componentWillMount: function(){
    var self = this;
    this.query = new Parse.Query(ThoughtModel);
    this.fetch();
    this.props.dispatcher.on('updateThought', function(){
        self.fetch();
    })
  },
  render: function() {
    var thoughtElements = this.state.thought.map(function(thought){
      return (<li>{thought.get('thought')}</li>)
    });
    return (
        <div><ul>{thoughtElements}</ul></div>
      )
  },
  fetch: function(){
      this.query.find().then(
        (thought) => {
          this.setState({thought: thought})
        },
        (err) => {
          console.log(err)
        }
      );
  }
})
