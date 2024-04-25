import {Component} from 'react'
import {TailSpin} from 'react-loader-spinner'
import TableItem from '../TableItem'
import FilterData from '../FilterData'
import './index.css'

class StudentTable extends Component {
  state = {
    isLoading: true,
    tableData: [],
    searchInput: '',
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {searchInput} = this.state

    if (searchInput === '') {
        try {
            const apiUrl = `http://localhost:3005/student`;
            const response = await fetch(apiUrl);
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json(); // Extract JSON data from the response
            console.log(data.length)
            const formattedData = data.map(eachItem => ({
              Name: eachItem.Name,
              StudentID: eachItem.StudentID,
              StudentCourse: eachItem.StudentCourse,
              StudentYear: eachItem.StudentYear,
              State: eachItem.State,
              Address: eachItem.Address,
            }))
            console.log(formattedData)
            this.setState({tableData: formattedData, isLoading: false});
          } catch (error) {
            console.error("Error fetching data:", error);
          }
      
    } else {

      try {
        const apiUrl = `http://localhost:3005/student/${searchInput}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const SearchedData = await response.json()
        console.log(SearchedData.length)

        
        this.setState({tableData: SearchedData, isLoading: false})
      } catch (error) {
        console.log(error)
        console.error("Error fetching data:", error);
      }
    }
  }

  enterSearchInput = () => {
    this.getData()
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput})
  }

  render() {
    const {isLoading, tableData, searchInput} = this.state
    
    return (
      <div className="blog-list-container">
        {isLoading ? (
          <TailSpin type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          <div>
            <FilterData
              searchInput={searchInput}
              changeSearchInput={this.changeSearchInput}
              enterSearchInput={this.enterSearchInput}
            />
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Year</th>
                  <th>Course</th>
                  <th>Address</th>
                  <th>State</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map(item => (
                
                  <TableItem tableData={item} key={item.StudentID} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    )
  }
}
export default StudentTable;