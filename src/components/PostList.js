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

    render() {
        const { photos, errorMessage } = this.state
        return (
            <div>
                List of Users
                {
                    photos.map(photo => <div key={(photo.id)}>{photo.title}</div>)
                }
                <table>
                    <tr><td>Album Id</td><td>Title</td><td>Thumbnail</td><td>Delete Image</td></tr>

                </table>
                {
                    errorMessage ? <div> {errorMessage}</div> : null
                }
            </div>
        )
    }
}

export default PostList