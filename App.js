import React, { Component } from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

var panelStyle = {
  'maxWidth': '80%',
  'margin': '100px auto'
}

var stageTitle = {
  'color': 'green',
  'marginBottom': '40px',
  'fontSize': '2.1rem'
}

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stageDetails: '',
      noOfStages: '',
      noOfTabs: [],
      formFields: {
        stageName: '',
        stageNumber: '',
        Users: '',
        Forms: '',
        desiganation: '',
        previous: "6"
      }


    }
    this.handleClick = this.handleClick.bind(this);
    this.startStages = this.startStages.bind(this);
    this.formHandler = this.formHandler.bind(this);
    this.stageDetails = this.stageDetails.bind(this);
    this.clearForm = this.clearForm.bind(this);
  }


  handleClick(e) {
    let formFields = { ...this.state.formFields };
    formFields[e.target.name] = e.target.value;
    this.setState({
      formFields
    });
    e.preventDefault();
    let noOfStages = { ...this.state.noOfStages };
    noOfStages[e.target.name] = e.target.value;
    console.log('noOfStages', noOfStages);
    this.setState({
      noOfStages
    });
    let selectedStages = this.state.noOfStages;
    console.log(selectedStages);
  }

  stageDetails(e) {
    this.setState({
      stageDetails: localStorage.getItem('stage1')
    });
  }

  clearForm = () => { 
    this.myFormRef.reset();
  }


  formHandler(e) {
    e.preventDefault();
    axios.post('http://192.168.1.6:5000/parallel/create', this.state.formFields)
      .then(function (response) {
        console.log(response.data._id);
        localStorage.setItem('stage1', response.data._id);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  startStages(e) {
    e.preventDefault();
    var selectedStages = Number(this.state.noOfStages.noOfStages);
    var noOfTabs = [];
    for (let i = 1; i < selectedStages+1; i++) {
      noOfTabs.push(i);
    }
    this.setState({
      noOfTabs
    });
  }

  render() {
    var forms = this.state.noOfTabs;
    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    return (
      <Tabs>
        <div id="workFlowDetls">
        <strong>Work Flow Name:</strong> <input name="workFlowName" placeholder="Work Flow Name" />
        <strong>Select stages:</strong>
        <select name="noOfStages" onChange={this.handleClick} value={this.state.noOfStages}>
          {arr.map((e, i) =>
              <option value={e}>{e}</option>
          )}
        </select>
        <button onClick={this.startStages}>Start</button>
      </div>
        <TabList>
          {forms.map((e, i) =>
                <Tab>Stage {e}</Tab>
            )}
        </TabList>

        {forms.map((e, i) =>
            <TabPanel>
              <div>
                  <div style={panelStyle}>
                      <div id="stageTitle" style={stageTitle}>Stage <span>{e}</span></div>
                      <div>
                      <form onSubmit={this.formHandler} ref={(el) => this.myFormRef = el}>
                          <strong>Stage Name:</strong> <br /> <input type="text" name="stageName" placeholder="Stage Name" onChange={this.handleClick} value={this.state.formFields.stageName} /> <br />
                          <strong>No. of stages:</strong> <br /> 
                          <select name="stageNumber" onChange={this.handleClick} value={this.state.formFields.stageNumber}>
                            {arr.map((e, i) =>
                                <option value={e}>{e}</option>
                            )}
                          </select> <br />
                          <strong>Users:</strong> <br /> <select name="Users" onChange={this.handleClick} value={this.state.formFields.Users}>
                            {arr.map((e, i) =>
                                <option value={e}>{e}</option>
                            )}
                          </select> <br />
                          <strong>Forms:</strong> <br /> <select name="Forms" onChange={this.handleClick} value={this.state.formFields.Forms}>
                            {arr.map((e, i) =>
                                <option value={e}>{e}</option>
                            )}
                          </select><br />
                          <strong>Designation:</strong> <br /> <input name="desiganation" placeholder="Designation" onChange={this.handleClick} value={this.state.formFields.desiganation} /> <br /><br />
                          <button onClick={this.stageDetails, this.clearForm}>Submit</button>
                      </form>
                      </div>
                  </div>
              </div>
            </TabPanel>
        )}
      </Tabs>
    );
  }
}

export default Register