Project Setup

*Node.js and npm installed on your machine.
 1 git clone https://github.com/CodeForRevolution/Unravel-Ass.git
 2 cd Unravel-Ass
 3 npm install
 4 npm start
 5 http://localhost:3000


 Architecture
Folder Structure:

    src/
        components/: Contains reusable components such as RoomCart, VideoPlayer, and Skeleton.
        data/: Holds the room data in JSON format for listing.
        App.js: Main application component handling state, infinite scroll, and rendering the room list.

Component Breakdown:

  1  App.js: Handles the state and logic for loading room data and infinite scrolling.
  2  RoomCart.js: Displays the room details such as name, bed type, price, images, and videos.
  3  VideoPlayer.js: Handles video autoplay on desktop and mobile devices with user interaction.
  4  Skeleton.js: Shows a skeleton loader while data is being fetched.        
 
Features

   1 Room Listing: Displays room details like room name, bed type, price, and media (images/videos).
   2 Infinite Scroll: Automatically loads more rooms as you scroll to the bottom of the page.
   3 Video Playback:
        Desktop: Videos play on hover after the user interacts with the page (due to browser autoplay restrictions).
        Mobile: Videos start playing when they come into view after user interaction.
   4 Skeleton Loading: Shimmer effect is displayed while waiting for data to be fetched.



Performance Optimizations

    Lazy Loading of Images/Videos: Only the visible media (images/videos) are loaded as users scroll, preventing excessive memory usage and improving loading speed.

    Debounced Infinite Scroll: The scroll event listener is optimized to avoid triggering too frequently. This improves performance by reducing unnecessary re-renders and API calls.

    Memoization and useCallback: Memoization is applied to the infinite scroll function using useCallback to ensure the function isn’t recreated on every render, boosting performance.

    Skeleton Loaders: Use of lightweight skeleton components to reduce the load time perception when data is being fetched.

    Component Separation: Extracting VideoPlayer and Skeleton as separate components helps in code reusability and performance by isolating functionality.


    Key Components

    RoomCart: Displays the room details and media.
    VideoPlayer: A separate component to handle video loading and autoplay functionality.
    Skeleton: A lightweight component used for displaying a shimmer effect while loading data.
    Infinite Scroll: Handles dynamic data loading by calculating scroll position and fetching new data when the user reaches the bottom.
