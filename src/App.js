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
    this.formHandler = this.formHandler.bind(this);
    this.stageDetails = this.stageDetails.bind(this);
    this.ClearForm = this.ClearForm.bind(this);
  }


  handleClick(e) {
    let formFields = { ...this.state.formFields };
    formFields[e.target.name] = e.target.value;
    console.log('formFields', formFields);
    this.setState({
      formFields
    });
  }

  stageDetails(e) {
    this.setState({
      stageDetails: localStorage.getItem('stage1')
    });
  }

  ClearForm = () => { 
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
  render() {
    let forms = [1, 2, 3, 4, 5];
    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    return (
      <Tabs>
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
                          <strong>No. of stages:</strong> <br /> <select name="stageNumber" onChange={this.handleClick} value={this.state.formFields.stageNumber}>
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
                          <button onClick={this.stageDetails, this.ClearForm}>Submit</button>
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