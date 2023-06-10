# NodeJS + ExpressJS APIS Test

Using NodeJS and ExpressJS write these APIs
Use any library

## Add blog post API

The API should accept these inputs:
//Not fully covered

1. title (Min 5 characters, Max 50 characters, No special characters, REQUIRED)
   //Not fully covered
2. description (Max 500 characters, REQUIRED)
   //Check
3. main_image (ONLY jpg, MAX size 1MB, REQUIRED)
   //Check
4. additional_images (ONLY jpg, Multiple, MAX size 1MB per image, MAX number of images 5, OPTIONAL)
   //Not covered
5. date_time (should be unix time, and not before now, REQUIRED)

What the API does:
//Check

1. Validates the inputs based on whats written above, if anything is wrong then send back the error message specifying the issue
   //Check
2. Compresses the images by 25%
   //Done
3. Saves images in "images/" folder
   //Check
4. Removes any left over temporary files used while doing compression (if applicable)
   //Done
5. Adds reference number incremented from last blog post in "blogs.json"
   //Done
6. Saves the blog post in "blogs.json" file
   //Done
7. Return back the added blog post as json

## Get all blog posts API

What the API does:
//Done

1. Reads all blog posts from "blogs.json"
   //Done
2. Formats "date_time" from unix time stamp into ISO string
   //Check
3. Adds "title_slug" which is a slugified version of the title (ex: My Blog Post -> my_blog_post)
   //Done
4. Returns blog posts

# Next Step

We want the images to be private, not accessible directly to public
So we will use a token to access the images

## Generate timed token for images API

//Check
The API should accept these inputs:

1. image_path

What the API does:
//Check

1. Generates a token that will expire after 5 minutes for this exact image_path

## Get image by token API

//Check
The API should accept these inputs:

1. image_path
2. token
   //Check
   What the API does:
3. Checks if token is valid (not expired, and is made for the input "image_path"), if invalid then send back an error
4. Sends back the image in a way that browser can display the image (not download it)
