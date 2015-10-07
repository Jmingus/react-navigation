var React = require('react');
var ThoughtModel = require('../models/ThoughtModel');
var SurveyListComponent = require('./SurveyListComponent');
var Backbone = require('backbone');
var _ = require('backbone/node_modules/underscore');

module.exports = React.createClass({
  componentWillMount: function() {
        this.dispatcher = {};
        _.extend(this.dispatcher, Backbone.Events);
  },
  render: function(){

    return(
      <div className="row">
        <form className="col s12" onSubmit={this.onSubmit}>
          <div className="row">
            <div className="input-field col s6">
              <label htmlFor="first_name">First Name</label>
              <input placeholder="First Name" id="first_name" ref="firstName" type="text"/>

            </div>
            <div className="input-field col s6">
              <label htmlFor="last_name">Last Name</label>
              <input id="last_name" type="text" ref="lastName" placeholder="Last Name"/>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <label htmlFor="thoughts">Enter Your Thoughts</label>
              <textarea id="thoughts" type="text" ref="thought" placeholder="Thoughts" />
            </div>
          </div>
          <button type="submit" className="btn">Submit Thought</button>
        </form>
        <SurveyListComponent dispatcher={this.dispatcher}/>
      </div>
    );
  },
  onSubmit: function(e){
    e.preventDefault();
    var newThought =  new ThoughtModel({
      firstName: this.refs.firstName.getDOMNode().value,
      lastName: this.refs.lastName.getDOMNode().value,
      thought: this.refs.thought.getDOMNode().value,
      user: Parse.User.current()
    });
    newThought.save();
    this.dispatcher.trigger('updateThought')
  }
})
