# Project Polaroid - Project Design (Group 13)
Our project is a platform for artists to share their creations with ordinary people (art enthusiasts and viewers). It will allow artists to post their work to a feed. Users will then be able to upvote/downvote the various posts and discover the art that is near them.

## High-level-design:
Our service comprises of a web application running Django and relies on PostgreSQL and Hadoop for batch jobs, database management, and for storing important information.

## Low-level design:
* When an artist creates a profile with our service, the following things occur:
 * He/she must submit a username and password as well as their name and email address. As a result an artist will be an authenticated user.
 * A unique  QR code will be given to the artist upon the creation of an account
* When an artist posts a new work, the following things occur: 
 * The image will be uploaded through Django and we will pass information like {title, caption, location, upvotes/downvotes/filepath, artist} to our database using Postgres.
 * Based on what the artist chose as the  location, we will group/shard(?) them by cities.
 * Afterwards they will be able to edit past posts.
* When a viewer upvotes/downvotes a piece of artwork
 * We will update the current posts’ information 
* When a viewer selects to sort the feed by the popularity of artworks 
 * We will retrieve posts with the most upvotes using a simple query
* When a viewer enters a location, the feed will then be reorganized to show the posts closests to that location
 * We will search for the closest cities, and retrieve artworks with the shortest distance 
* When a viewer selects the name of a certain artists
 * They will see something similar to the artist’s homepage but they won’t have authentication so they cannot edit/modify/add anything
* When a viewer scans a QR code of a art piece they encounter
 * They will be directed to the artist’s homepage 

## Scope of the project:
### What do we intend to do:
We want to have a fully functional demo of our app. Users will be able to find art by artist (and an artists QR Code) and search for art based on what’s nearby (GIS search). Artists will be able to generate QR codes for their art and have a page that shows their artwork based on popularity.  

### What do we not intend to do:
Popularity will only implemented via user generated upvotes/downvotes. While there are other, potentially superior ways to implement popularity such as number of hits, we do not want to implement these. Although there are many additional features we can add to make it more interactive, such as adding the ability for users to add comments, these are things that we are going to avoid due to added complexity.

## Languages and technologies
We will use Postgres as our database due to its excellent geospatial support. We plan on using Django for our backend and image storage (using local disk file-paths in database model) with support from Python. Hadoop will be used to run batch jobs. 
