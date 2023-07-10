import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStyles } from './utils'

const labelStyles = { mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold' }
const AddBlog = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    imageURL: '',
  })
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const sendRequest = async () => {
    const res = await axios
      .post('https://blog-kqc7.onrender.com/api/blog/add', {
        title: inputs.title,
        description: inputs.description,
        image: inputs.imageURL,
        user: localStorage.getItem('userId'),
      })
      .catch((err) => console.log(err))
    const data = await res.data
    return data
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputs)
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate('/blogs'))
  }
  const addPhotos = (e) => {
    // add image from local storage
    const image = e.target.files[0]
    const reader = new FileReader()
    let urls = ''
    reader.onload = (e) => {
      const img = document.createElement('img')
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const maxWidth = 800 // Set the maximum width for the resized image
        const maxHeight = 600 // Set the maximum height for the resized image
        let width = img.width
        let height = img.height

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width)
            width = maxWidth
          } else {
            width = Math.round((width * maxHeight) / height)
            height = maxHeight
          }
        }

        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)

        const dataUrl = canvas.toDataURL('image/jpeg', 0.7) // Adjust the quality (0.0 - 1.0) as desired

        urls = dataUrl
        setInputs((prevState) => ({
          ...prevState,
          imageURL: urls,
        }))
      }

      img.src = e.target.result
    }
    if (image) {
      reader.readAsDataURL(image)
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          backgroundColor="#ffd8b0"
          border={3}
          borderColor="linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116,49,110,1) 36%, rgba(2,0,161,1) 73%, rgba(69,92,252,1) 100%)"
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin={'auto'}
          marginTop={3}
          display="flex"
          flexDirection={'column'}
          width={'80%'}
        >
          <Typography
            className={classes.font}
            fontWeight={'bold'}
            padding={3}
            color="grey"
            variant="h2"
            textAlign={'center'}
          >
            Post Your Blog
          </Typography>
          <InputLabel className={classes.font} sx={labelStyles}>
            Title
          </InputLabel>
          <TextField
            className={classes.font}
            name="title"
            onChange={handleChange}
            value={inputs.title}
            margin="auto"
            variant="outlined"
          />
          <InputLabel className={classes.font} sx={labelStyles}>
            Description
          </InputLabel>
          <TextField
            className={classes.font}
            name="description"
            onChange={handleChange}
            value={inputs.description}
            margin="auto"
            variant="outlined"
          />
          <InputLabel className={classes.font} sx={labelStyles}>
            ImageURL
          </InputLabel>
          <TextField
            className={classes.font}
            name="imageURL"
            onChange={handleChange}
            value={inputs.imageURL}
            margin="auto"
            variant="outlined"
          />
          <InputLabel className={classes.font} sx={labelStyles}>
            AddImage
          </InputLabel>
          {/* input field of image in mui */}
          <input type="file" onChange={addPhotos} />

          <Button
            sx={{ mt: 2, borderRadius: 4 }}
            variant="contained"
            color="warning"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  )
}

export default AddBlog
