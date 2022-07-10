import React, { Component } from 'react'
import axios from 'axios'

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
                List of Albums
                <table>
                    <thead>
                        <tr><td>Album Id</td><td>Title</td><td>Thumbnail</td><td>Delete Image</td></tr>
                    </thead>

                    <tbody>
                        {
                            photos.map(
                                photo =>
                                    <tr key={(photo.id)}>
                                        <td>{photo.albumId}</td>
                                        <td>{photo.title}</td>
                                        <td><img src={photo.thumbnailUrl} alt={photo.title}/></td>
                                        <td><button onClick={(e) => this.deleteRow(photo.id, e)}>Delete Image?</button></td>
                                    </tr>
                            )

                        }
                    </tbody>


                </table>
                {
                    errorMessage ? <div> {errorMessage}</div> : null
                }
            </div>
        )
    }
}

export default PostList