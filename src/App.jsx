import { useState, useEffect } from 'react'
import axios from 'axios'

export default function App() {

  // useState hooks for friends, picture, and name data
  const [friends, setFriends] = useState([])
  const [picture, setPicture] = useState('')
  const [name, setName] = useState('')

  // async function to access data from the '/api/friends' route in 'app.js'
  const getSavedFriends = async () => {
    await axios.get('/api/friends')
    .then((res) => {
      setFriends(res.data) // sets the value of 'friends' to 'SAVED_FRIENDS' in 'app.js'
    })
  }

  // addFriend function declares the array, 'newFriends' and populates it with a copy of the 'friends' array
  // pushes an object consisting of the values of 'picture' and 'name'
  // sets the value of 'friends' to 'newFriends' with 'setFriends()'
  // resets the values of 'name' and 'picture' back to an empty string
  const addFriend = () => {
    const newFriends = [...friends]
    newFriends.push({picture: picture, name: name})
    setFriends(newFriends)

    setName('')
    setPicture('')
  }

  // useEffect invokes getSavedFriends 
  useEffect(() => {
    getSavedFriends()
  }, [])

  // loop through 'friends' using .map() to create HTML tags for displaying friend info
  const friendInfo = friends.map((friend) => (
    <div key={friend.name}>
      <img src={friend.picture} alt={friend.name} style={{height: "120px", width: "150px"}} />
      <span>{friend.name}</span>
    </div>
  ))

  return (
    <div>
      <label htmlFor="picture" >Picture:</label>
      <input type="text" name="picture" value={picture} onChange={(e) => setPicture(e.target.value)} />

      <label htmlFor="name">Name:</label>
      <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />

      <button name="addFriend" onClick={addFriend}>Add Friend</button>

      {friendInfo}
    </div>
  )
}
