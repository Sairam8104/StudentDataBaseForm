import React,{Component} from 'react'

import './index.css'

class StudentForm extends Component {
 
    
    
  state = {
    isSubmit: false,
    firstName: '',
    studentNumber: '',
    studentYear: 'PleaseSelect',
    studentCourse: 'PleaseSelect',
    presentStreetAddress: '',
    presentState: '',
    errorMsg: false,
    checkBox: false,
    showFirstErrorMessage: false,
    showStudentNumberErrorMessage: false,
    showStudentYearErrorMessage: false,
    showStudentCourseErrorMessage: false,
    showPresentStreetAddressErrorMessage: false,
    showPresentStateErrorMessage: false,
    showPresentCountryErrorMessage: false,
    showCheckboxErrorMessage: false,
    
  }

  
  onClickSubmit = () => {
    this.setState({
      firstName: '',
      studentNumber: '',
      studentYear: 'PleaseSelect',
      studentCourse: 'PleaseSelect',
      presentStreetAddress: '',
      presentState: '',
      presentCountry: '',
      checkBox: false,
      isSubmit: false,
      showFirstErrorMessage: false,

      showStudentNumberErrorMessage: false,
      showStudentYearErrorMessage: false,
      showStudentCourseErrorMessage: false,
      showPresentStreetAddressErrorMessage: false,
      showPresentStateErrorMessage: false,
      showPresentCountryErrorMessage: false,
      showCheckboxErrorMessage: false,
    })
  }

  onChangeFirstName = event => {
    this.setState({firstName: event.target.value})
  }

  onChangeStudentNumber = event => {
    this.setState({studentNumber: event.target.value})
  }

  onChangeStudentYear = event => {
    this.setState({studentYear: event.target.value})
  }

  onChangeStudentCourse = event => {
    this.setState({studentCourse: event.target.value})
  }

  onChangePresentStreetAddress = event => {
    this.setState({presentStreetAddress: event.target.value})
  }

  onChangePresentState = event => {
    this.setState({presentState: event.target.value})
  }

  onChangeCheckBox = () => {
    const {checkBox} = this.state
    this.setState({checkBox: !checkBox})
  }

  onBlurFirstName = () => {
    const validateFirstName = this.validateFirstName()
    this.setState({showFirstErrorMessage: !validateFirstName})
  }

  onBlurStudentNumber = () => {
    const validateStudentNumber = this.validateStudentNumber()
    this.setState({showStudentNumberErrorMessage: !validateStudentNumber})
  }

  onBlurStudentYear = () => {
    const validateStudentYear = this.validateStudentYear()
    this.setState({showStudentYearErrorMessage: !validateStudentYear})
  }

  onBlurStudentCourse = () => {
    const validateStudentCourse = this.validateStudentCourse()
    this.setState({showStudentCourseErrorMessage: !validateStudentCourse})
  }

  onBlurPresentStreetAddress = () => {
    const validatePresentStreetAddress = this.validatePresentStreetAddress()
    this.setState({
      showPresentStreetAddressErrorMessage: !validatePresentStreetAddress,
    })
  }

  onBlurPresentState = () => {
    const validatePresentState = this.validatePresentState()
    this.setState({
      showPresentStateErrorMessage: !validatePresentState,
    })
  }

  validateFirstName = () => {
    const {firstName} = this.state
    return firstName !== ''
  }

  validateStudentNumber = () => {
    const {studentNumber} = this.state
    return studentNumber !== ''
  }

  validateStudentYear = () => {
    const {studentYear} = this.state
    return studentYear !== 'PleaseSelect'
  }

  validateStudentCourse = () => {
    const {studentCourse} = this.state
    return studentCourse !== 'PleaseSelect'
  }

  validatePresentStreetAddress = () => {
    const {presentStreetAddress} = this.state
    return presentStreetAddress !== ''
  }

  validatePresentState = () => {
    const {presentState} = this.state
    return presentState !== ''
  }

  validateCheckBox = () => {
    const {checkBox} = this.state
    return checkBox !== false
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {studentNumber} = this.state

    const validateFirstName = this.validateFirstName()
    const validateStudentNumber = this.validateStudentNumber()
    const validateStudentYear = this.validateStudentYear()
    const validateStudentCourse = this.validateStudentCourse()
    const validatePresentStreetAddress = this.validatePresentStreetAddress()
    const validatePresentState = this.validatePresentState()
    const validateCheckBox = this.validateCheckBox()

    if (
      validateFirstName &&
      validateStudentNumber &&
      validateStudentYear &&
      validateStudentCourse &&
      validatePresentStreetAddress &&
      validatePresentState &&
      validateCheckBox
    ) {
      const valueoptions = {
        method: 'GET',
      }
      try {
        const apiUrl = `http://localhost:3005/student${studentNumber}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json(); // Extract JSON data from the response
       
        const formattedData = data.map(eachItem => ({
          Name: eachItem.Name,
          StudentID: eachItem.StudentID,
          StudentCourse: eachItem.StudentCourse,
          StudentYear: eachItem.StudentYear,
          State: eachItem.State,
          Address: eachItem.Address,
        }))
        this.setState({tableData: formattedData, isLoading: false});
      } catch (error) {
        const {
          firstName,
          studentCourse,

          studentYear,
          presentState,
          presentStreetAddress,
        } = this.state
      }

      

      
      if (searchResult.length === 0) {
        
        this.setState(prevState => ({isSubmit: !prevState.isSubmit}))
        const senddata = {
          Name: firstName,
          StudentID: studentNumber,
          StudentCourse: studentCourse,
          StudentYear: studentYear,
          Address: presentStreetAddress,
          State: presentState,
        }
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(senddata),
        }
        fetch(
          'https://studentdatabase-production-3a0c.up.railway.app/student',
          options,
        )
      } else {
        this.setState({errorMsg: true})
      }
    } else {
      this.setState({
        showFirstErrorMessage: !validateFirstName,
        showStudentNumberErrorMessage: !validateStudentNumber,
        showStudentYearErrorMessage: !validateStudentYear,
        showStudentCourseErrorMessage: !validateStudentCourse,
        showPresentStreetAddressErrorMessage: !validatePresentStreetAddress,
        showPresentStateErrorMessage: !validatePresentState,
        showCheckboxErrorMessage: !validateCheckBox,
        isSubmit: false,
      })
    }
  }

  renderFirstName = () => {
    const {firstName, showFirstErrorMessage} = this.state
    const errorHighlighted = showFirstErrorMessage ? 'error-highlight' : ''
    return (
      <>
        <label htmlFor="firstName" className="text-label">
          FIRST NAME
        </label>
        <input
          onBlur={this.onBlurFirstName}
          type="text"
          id="firstName"
          value={firstName}
          onChange={this.onChangeFirstName}
          placeholder="First name"
          className={`input-element ${errorHighlighted}`}
        />
      </>
    )
  }

  renderStudentNumber = () => {
    const {studentNumber, showStudentNumberErrorMessage} = this.state
    const errorHighlighted = showStudentNumberErrorMessage
      ? 'error-highlight'
      : ''
    return (
      <>
        <label htmlFor="studentNumber" className="text-label">
          STUDENT NUMBER
        </label>
        <input
          onBlur={this.onBlurStudentNumber}
          type="text"
          id="studentNumber"
          value={studentNumber}
          onChange={this.onChangeStudentNumber}
          placeholder="111128988"
          className={`input-element ${errorHighlighted}`}
        />
      </>
    )
  }

  renderStudentYear = () => {
    const {studentYear, showStudentYearErrorMessage} = this.state
    const errorHighlighted = showStudentYearErrorMessage
      ? 'error-highlight'
      : ''
    return (
      <>
        <label htmlFor="studentYear" className="text-label">
          STUDENT YEAR
        </label>
        <select
          onBlur={this.onBlurStudentYear}
          id="studentYear"
          value={studentYear}
          onChange={this.onChangeStudentYear}
          className={`input-element ${errorHighlighted}`}
        >
          <option value="Please Select">Please Select</option>
          <option value="1st Year">1st Year</option>
          <option value="2nd Year">2nd Year</option>
          <option value="3rd Year">3rd Year</option>
          <option value="4th Year">4th Year</option>
          <option value="5th Year">5th Year</option>
        </select>
      </>
    )
  }

  renderStudentCourse = () => {
    const {studentCourse, showStudentCourseErrorMessage} = this.state
    const errorHighlighted = showStudentCourseErrorMessage
      ? 'error-highlight'
      : ''
    return (
      <>
        <label htmlFor="studentCourse" className="text-label">
          STUDENT COURSE
        </label>
        <select
          onBlur={this.onBlurStudentCourse}
          id="studentCourse"
          value={studentCourse}
          onChange={this.onChangeStudentCourse}
          className={`input-element ${errorHighlighted}`}
        >
          <option value="Please Select">Please Select</option>
          <option value="CSE">CSE</option>
          <option value="MEC">MEC</option>
          <option value="ECE">ECE</option>
          <option value="EEE">EEE</option>
          <option value="CSE-AI">CSE-AI</option>
        </select>
      </>
    )
  }

  renderPresentStreetAddress = () => {
    const {
      presentStreetAddress,
      showPresentStreetAddressErrorMessage,
    } = this.state
    const errorHighlighted = showPresentStreetAddressErrorMessage
      ? 'error-highlight'
      : ''
    return (
      <>
        <label htmlFor="presentStreetAddress" className="text-label">
          Street Address
        </label>
        <input
          onBlur={this.onBlurPresentStreetAddress}
          type="text"
          id="presentStreetAddressLine"
          value={presentStreetAddress}
          onChange={this.onChangePresentStreetAddress}
          placeholder="111128988"
          className={`input-element ${errorHighlighted}`}
        />
      </>
    )
  }

  renderPresentState = () => {
    const {presentState, showPresentStateErrorMessage} = this.state
    const errorHighlighted = showPresentStateErrorMessage
      ? 'error-highlight'
      : ''
    return (
      <>
        <label htmlFor="presentState" className="text-label">
          State
        </label>
        <input
          onBlur={this.onBlurPresentState}
          type="text"
          id="presentState"
          value={presentState}
          onChange={this.onChangePresentState}
          placeholder="enter state"
          className={`input-element ${errorHighlighted}`}
        />
      </>
    )
  }

  renderPresentCountry = () => {
    const {presentCountry, showPresentCountryErrorMessage} = this.state
    const errorHighlighted = showPresentCountryErrorMessage
      ? 'error-highlight'
      : ''
    return (
      <>
        <label htmlFor="presentCountry" className="text-label">
          Country
        </label>
        <input
          onBlur={this.onBlurPresentCountry}
          type="text"
          id="presentCountry"
          value={presentCountry}
          onChange={this.onChangePresentCountry}
          placeholder="enter Country"
          className={`input-element ${errorHighlighted}`}
        />
      </>
    )
  }

  renderCheckbox = () => {
    const {checkBox, showCheckboxErrorMessage} = this.state
    const errorHighlighted = showCheckboxErrorMessage ? 'error-highlight' : ''
    return (
      <>
        <input
          type="checkbox"
          id="checkBox"
          checked={checkBox}
          onChange={this.onChangeCheckBox}
          className={`checkbox ${errorHighlighted}`}
        />
        <label htmlFor="checkBox" className="check-label">
          Check all
        </label>
      </>
    )
  }

  renderRegistration = () => {
    const {
      showFirstErrorMessage,
      errorMsg,
      showStudentNumberErrorMessage,
      showStudentYearErrorMessage,
      showStudentCourseErrorMessage,

      showPresentStreetAddressErrorMessage,

      showPresentStateErrorMessage,

      showCheckboxErrorMessage,
    } = this.state
    return (
      <form onSubmit={this.onSubmitForm} className="form-container">
        <h1>Full Name</h1>
        <div className="Full-Name-Container">
          <div className="input-container-three">
            {' '}
            {this.renderFirstName()}
            {showFirstErrorMessage ? (
              <p className="error-message">Required</p>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="Full-Name-Container">
          <div className="input-container">
            {' '}
            {this.renderStudentNumber()}
            {showStudentNumberErrorMessage ? (
              <p className="error-message">Required</p>
            ) : (
              ''
            )}
          </div>
          <div className="input-container">
            {' '}
            {this.renderStudentYear()}
            {showStudentYearErrorMessage ? (
              <p className="error-message">Required</p>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="Full-Name-Container">
          <div className="input-container">
            {' '}
            {this.renderStudentCourse()}
            {showStudentCourseErrorMessage ? (
              <p className="error-message">Required</p>
            ) : (
              ''
            )}
          </div>
        </div>
        <h1>Present Address</h1>
        <div>
          <div className="Full-Name-Container">
            <div className="input-container-address">
              {' '}
              {this.renderPresentStreetAddress()}
              {showPresentStreetAddressErrorMessage ? (
                <p className="error-message">Required</p>
              ) : (
                ''
              )}
            </div>
            <div className="input-container-address">
              {' '}
              {this.renderPresentState()}
              {showPresentStateErrorMessage ? (
                <p className="error-message">Required</p>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
        <div>
          <div className="input-container-check">
            {' '}
            {this.renderCheckbox()}
            {showCheckboxErrorMessage ? (
              <p className="error-message">Required</p>
            ) : (
              ''
            )}
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
        {errorMsg ? <p>Data Already exist</p> : ''}
      </form>
    )
  }

  renderSubmit = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        alt="success"
      />
      <p>Submitted Successfully</p>
      <button type="button" onClick={this.onClickSubmit} className="submit-btn">
        Submit Another Response
      </button>
    </>
  )

  render() {
    const {isSubmit} = this.state;
    
    return (
      <div className="main-container">
        <h1 className="heading">Registration</h1>
        <div className="container">
          {isSubmit ? this.renderSubmit() : this.renderRegistration()}
        </div>
      </div>
    )
  }
}

export default StudentForm