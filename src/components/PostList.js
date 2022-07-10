import React, { Component } from 'react'
import axios from 'axios'
import PostNewPhoto from './PostNewPhoto'
import './postalbum.css'

class PostList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            photos: [],
            error: ''
        }
    }
    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/photos')
            .then(response => {
                console.log(response)
                this.setState({ photos: response.data })
            })
            .catch(error => {
                console.log(error)
                this.setState({ errorMessage: 'Could not retrieve data' })
            })
    }

    deleteRow = (id, e) => {
        e.preventDefault()
        axios.delete(`https://jsonplaceholder.typicode.com/photos/${id}`)
            .then(response => {
                console.log(response)
                console.log(response.data)
                const photos = this.state.photos.filter(item => item.id !== id)
                this.setState({ photos })
            })
    }

    render() {
        const { photos, errorMessage } = this.state
        return (
            <div>
                <h1>List of Albums</h1>
                        <PostNewPhoto />
                    <div className='table-fixed'>
                <table>
                    <thead>
                        <tr>
                            <th>Album Id</th>
                            <th>Title</th>
                            <th>Thumbnail</th>
                            <th>Delete Image</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            photos.map(
                                photo =>
                                    <tr key={(photo.id)}>
                                        <td>{photo.albumId}</td>
                                        <td>{photo.title}</td>
                                        <td><img src={photo.thumbnailUrl} alt={photo.title} /></td>
                                        <td><button className='delete-row-btn' onClick={(e) => this.deleteRow(photo.id, e)}>Delete</button></td>
                                    </tr>
                            )

                        }
                    </tbody>

                </table>
                </div>
                {
                    errorMessage ? <div> {errorMessage}</div> : null
                }
            </div>
        )
    }
}

export default PostList