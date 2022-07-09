import axios from 'axios'
import React, { Component } from 'react'

class PostTable extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
           photoId: '',
           photoTitle: '',
           photoThumbnail: ''
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    deleteHandler = (e) => {
        e.preventDefault()
        axios.post('https://jsonplaceholder.typicode.com/photos', this.state)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
            //this.setState({ errorMessage: 'Could not retrieve data' })
        })
    }
  render() {
    const{photoId, photoTitle, photoThumbnail} = this.state
    return (
      <div>
        <form onSubmit={this.deleteHandler}>
        <tr><td><input type='text' name='photoId' value={photoId} onChange={this.changeHandler}></input></td>
        <td><input type='text' name='photoTitle' value={photoTitle} onChange={this.changeHandler}></input></td>
        <td><img name='photoThumbnail' value={photoThumbnail} src={photoThumbnail} onChange={this.changeHandler}></img></td>
        <td><button type='submit'>Delete Image?</button></td></tr>
        </form>
      </div>
    )
  }
}

export default PostTable