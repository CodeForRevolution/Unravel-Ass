This project showcases a dynamic Room Listing with infinite scroll, video playback, and skeleton loading features for an enhanced user experience.
Features

    Room Listing: Displays room details such as name, bed type, price, images, and videos.
    Infinite Scroll: Automatically loads more rooms as you scroll down the page.
    Video Playback:
        Desktop: Videos play on hover once the user interacts with the page (e.g., clicks).
        Mobile: Videos auto-play when they enter the viewport, after the user interaction (click) is detected.
    Skeleton Loading: Shimmer effect displayed while data is being fetched to simulate content loading.

Tech Stack

    React.js: For building the user interface.
    CSS: For styling the application.
    Hooks (useState, useEffect, useRef): For managing state, handling side effects, and working with DOM elements.

Key Components

    RoomCart: Displays the details and media (image or video) of each room.
    Skeleton: Shows shimmer loading placeholders while data is being fetched.
    Infinite Scroll: Manages the continuous data loading when scrolling reaches the bottom.
    VideoPlayer: A separate component to handle video loading and playback for cleaner code structure.