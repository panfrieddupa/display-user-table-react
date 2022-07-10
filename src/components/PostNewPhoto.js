import axios from 'axios'
import Popup from 'reactjs-popup'
import React, { Component } from 'react'

class PostNewPhoto extends Component {
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
            [e.target.name]: e.target.value
        })
    }

    submitHandler = (e) => {
        e.preventDefault()
        axios.post('https://jsonplaceholder.typicode.com/photos', this.state)
            .then(response => {
                console.log(response)
                alert(`New Id: ${this.state.photoId}\nNew title: ${this.state.photoTitle}`)
            })
            .catch(error => {
                console.log(error)
                //this.setState({ errorMessage: 'Could not retrieve data' })
            })
    }
    render() {
        const { photoId, photoTitle } = this.state
        return (
            <Popup trigger={<button className='add-album-btn'>Add New Photo</button>} position='center center'>
                <form onSubmit={this.submitHandler} className='add-album-popup'>
                    <h1>Enter new album information</h1>
                    <table className='popup-inner-box'>
                        <tbody>
                        <tr>
                            <td>
                                <label htmlFor='photoId'>New Photo ID</label>
                            </td>
                            <td>
                                <input type='text' name='photoId' value={photoId} onChange={this.changeHandler}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor='photoTitle'>New Photo Title</label>
                            </td>
                            <td>
                                <input type='text' name='photoTitle' value={photoTitle} onChange={this.changeHandler}></input>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <button className='popup-submit-btn' type='submit'>Submit New Image</button>
                </form>
            </Popup>
        )
    }
}

export default PostNewPhoto