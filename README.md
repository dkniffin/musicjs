musicjs (beta name) is a mp3 music library management program. It was developed due to a lack of cross-platform, open source, good music management software. I came from using MediaMonkey on Windows. When I switched to linux, I tried several different programs, and wasn't really satisified with any. I considered contributing to existing projects, but did not, due to lack of experience in their languages/frameworks.

musicjs runs on the node-webkit framework.

Features (not all implemented yet)
==================================
- Scan multiple directories for mp3s
- Read/write id3v2 tags
- Play mp3s (perhaps more formats later)
- Customizable interface with skins and plugins
- Cross-platform (Windows, Linux, and OSX)
- Capable of managing large music libraries
- Fast
- Playlist creation/playback
- Two-way device syncronization (ie: read ratings back from device)

Dependencies
============
musicjs should be able to package into a single object for download and runtime. The following node modules will need to be included in that package.
- async - Asynchronous control flow
- atry - Asynchronous try/catch (error handling)
- id3js - id3 read (and hopefully write) module
- recursive-readdir - Recursively find files in a directory
