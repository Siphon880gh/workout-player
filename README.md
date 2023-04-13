# Workout Notebooks

By Weng Fei Fung. 


![Last Commit](https://img.shields.io/github/last-commit/Siphon880gh/workout-notebook-player/main)
<a target="_blank" href="https://github.com/Siphon880gh" rel="nofollow"><img src="https://img.shields.io/badge/GitHub--blue?style=social&logo=GitHub" alt="Github" data-canonical-src="https://img.shields.io/badge/GitHub--blue?style=social&logo=GitHub" style="max-width:10ch;"></a>
<a target="_blank" href="https://www.linkedin.com/in/weng-fung/" rel="nofollow"><img src="https://camo.githubusercontent.com/0f56393c2fe76a2cd803ead7e5508f916eb5f1e62358226112e98f7e933301d7/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c696e6b6564496e2d626c75653f7374796c653d666c6174266c6f676f3d6c696e6b6564696e266c6162656c436f6c6f723d626c7565" alt="Linked-In" data-canonical-src="https://img.shields.io/badge/LinkedIn-blue?style=flat&amp;logo=linkedin&amp;labelColor=blue" style="max-width:10ch;"></a>
<a target="_blank" href="https://www.youtube.com/user/Siphon880yt/" rel="nofollow"><img src="https://camo.githubusercontent.com/0bf5ba8ac9f286f95b2a2e86aee46371e0ac03d38b64ee2b78b9b1490df38458/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f596f75747562652d7265643f7374796c653d666c6174266c6f676f3d796f7574756265266c6162656c436f6c6f723d726564" alt="Youtube" data-canonical-src="https://img.shields.io/badge/Youtube-red?style=flat&amp;logo=youtube&amp;labelColor=red" style="max-width:10ch;"></a>


Organize your fitness links from videos on Facebook, Instagram, Youtube, TikTok, and Vimeo. You're simply saving the links into text files. Optionally you can be specific about the timemarks. This app will let you choose any text file of exercise links and play through it. The idea is that you may not be familiar with these exercises but you can be instructed on them through the video links you saved and hoped to get to.

## Supported Videos:

- Facebook video (not reel)

- Instagram reel

- TikTok video

- Vimeo video

- Youtube video

- Youtube short

## Unsupported Videos


- Facebook Reel 

Was previously thought to be supported with
`FBREEL <video_clip_you_extracted> <audio_clip_you_extracted>`

However at a much later time, "URL signature expired" would output from their server.

- Instagram Multireel


## How to save workouts

- Workout = text file
- Category/subcategory/subsubcategory = folder

Organizing the workouts is easy. A text file repersents one workout (30 minute or 90 minute session, or however long, up to you). You save the video links in the text file, and optionally timemarks if you only need a part of the video. You can have the text files inside a folder. Thus, a text file represents the workout session.

You can have folders of folders depending on your organizational needs. As long as they're inside `public/data/notebooks`, the app will show all folders with their workouts in the Navigation Panel. Click the text file in the app to play it like a slideshow, and the video links that have timemarks will be clipped for the slideshow. 

A folder organization scheme can be by Workout type -> Body part -> Muscle group. You might not have muscle group if that workout type is more of a split program. You can name workout type like Resistance Training / Cardio / Stretching / Mobility / etc.

All your workout text files and folders should be inside `/data/workouts`. 

## How to update the app's Navigation Panel

You'll have to run a command to update the app when you change your workout file structure (changed file or folder name, added/deleted file, added/deleted folder). You do not need to run the command if you updated the text file's links and contents. The app's navigator just needs to be updated.

In the future this will be automatic when I implement a server, however there is not much time on my end right now. 

To update the app, just run `npm run start`.

## Follow the text format:

Format is
```
<exercise_title>
PICTURE <gif/etc link> <optional_width_px_or_other_unit_or_na> <optional_height_px_or_other_unit_or_na> <optional_for_pictures_across:-->
PICTURE <gif/etc link>
YOUTUBE <youtube-link> <timemark_or_seconds_or_na> <timemark_or_seconds_or_na>
YOUTUBESHORT https://www.youtube.com/shorts/oLYM46dWYzM
MISCVIDEO <fbVideo/insta/tiktok/vimeo>
INSTRUCTION <your_text>
INSTRUCTION <your_text>
INTERVAL <ready_duration_or_na> <duration> <rest_duration_or_na>
SET <reps> <rest_duration>
SET <reps> <rest_duration>


<exercise_title>
...
```

To reiterate, a text file is your workout session from the video links. You may add timemarks if the video has impertinent segments (like a video intro/outro/transitions/B-roll's, other exercises that don't fit yout workout, etc).

The app will display the workout name from the filename. Each exercise must follow the format of an Exercise name, then any pictures and/or video links, then a set or an interval. 

When it comes to the video link, certain video platform will require "FBREEL" or "YOUTUBE" or "YOUTUBESHORT" rather than the catch-all "MISCVIDEO". This is because their embed or viewing logic is different than usual and my app needs to know your intention. In the future, the app will look at the URL and determine the type of video playing algorithm to use, however I am short on time right now.

Your SET or INTERVAL is how you perform the exercise. If it's an INTERVAL, it wil count down




Format with workout description. You must group workout descriptions into its own section using `---`
```
WORKOUTDESC This is a pull split day
WORKOUTDESC Muscles worked include biceps and hamstrings
---
<exercise_title>
PICTURE <gif/etc link> <optional_width_px_or_other_unit_or_na> <optional_height_px_or_other_unit_or_na> <optional_for_pictures_across:-->
PICTURE <gif/etc link>
INSTRUCTION <your_text>
INSTRUCTION <your_text>
INTERVAL <ready_duration_or_na> <duration> <rest_duration_or_na>
SET <reps> <rest_duration>
SET <reps> <rest_duration>
```

Example
```
<exercise_title>
PICTURE <gif/etc link>
PICTURE <gif/etc link>
YOUTUBE <youtube-vid-link> 3:01 na
YOUTUBE <youtube-short-link>
INSTRUCTION <your_text>
INSTRUCTION <your_text>
INTERVAL 5s 30s na
SET 5r 30s
SET 5r na
```

Important: Separate each exercise with a line of three slashes `---`.

For the custom width and heights of the pictures, they are optional. If you do height only, however, you will need something at the width because height is by position the third item in the PICTURE line. You can use na or auto for that width. Auto will keep the aspect ratio of the original picure relative to a custom height or width. If you want pictures to be across each other instead of after another, you want to place "--" at the end of each of the pictures that will belong to the row, and remember that it's at the 4th position separated by spaces.

- First line always is title of exercise. Is mandatory.
- Picture is a link like`https://link-to-pic`
- INSTRUCTION is your paragraph of explanation. You can have as many as possible on different lines.
- Then you have either INTERVAL or SET. You can have many as possible on different lines. To explain further:
- INTERVAL is Getting ready duration, Active duration, and Rest period after
- SET is reps and rest period (can be s, m, or a mix. Eg. 30s, Eg. 1m, Eg. 1m30s). Make sure with mixed time units, that they are together with no spaces (Eg. 1m30s); otherwise what's after the space is ignored.
- No mixing sets and intervals in the same exercise. You can have a completely different exercise

## Video Format:

- YOUTUBE is a Youtube link like `https://wwww.youtube.com/...`. For Youtube videos, you can clip the video where the exercise instruction is by providing a start timemark or start and end timemarks. A timemark is like 1:00.
- After YOUTUBE separated by spaces, you have a Video Times to set the playing start time and end time. If you don't want an end time and have the video play through from custom start time to end of video: TIME na. To have it start from beginning and end at a specific time: na TIME. Other scenarios possible as well, but make sure to use na if a time isn't applicable. Time format is MM:SS like 3:01.
- YOUTUBESHORT is a Youtube short link like `https://wwww.youtube.com/shorts/...`. Clipping a start/end time is not supported.
- MISCVIDEO is anything else besides Youtube. No clipping has been implemented because as of 3/1/23, their policies do not allow cors with clipping. MISCVIDEO can be Facebook reel, Instagram video, Tiktok, Vimeo.
- FBREEL is Facebook Reel, NOT Facebook Video. FBREEL is semi-supported. You have to do additional steps using Chrome DevTools' Inspect to get the proper URLs. Facebook does not support embedding Facebook Reels, and they have separated a reel into both video and audio clips that play synchronously.

Remember that the app only supports unlisted or public videos. Even if your private Vimeo video has the hash "h" URL query, it will not be supported. 


## Semi-Supported Videos (requires some manual work):

- Facebook reel (Status: Untested whether it expires, so is classified as semi)

## Unsupported Videos:

- Instagram multireel

Is like a Facebook story with consecutive video clips in one screen.
For example: https://www.instagram.com/p/CpLIeRPOr5m/?utm_source=ig_web_copy_link

Instagram does not support iframe into a multireel or the sharing of one of the reels.

When you attempt to share only one reel of a multireel, you have to work around Instagram not changing the URL for each reel of the multireel. This would be worked around by right clicking and inspecting on the specific reel being played, and you would copy the direct media file link whose format is similar to `https://scontent-sjc3-1.cdninstagram.com/v/` from the video tag. Then you would use that link in an iframe. 

However, Instagram does not allow CORS on a multireel (or even embedding of multireel) so your iframe would not load; You would circumvent the CORS restriction with the PHP file (public/video-formatters/obsoleted-instagram-multireel/index.php). Then that PHP file would echo the cURL output into a video source set to base64 data.

However, the Instagram multireel link would expire, making this impractical unless you have a cron job that will parse for the direct media file link of the specific reel of interest from the main Instagram multireel link. In addition, your cron job will also update the workout text file. This will have to be daily or however frequently Instagram expires their direct media file links. If you are willing to work on that development, the PHP file is:
 
    ```
    <?php

    // URL needs to have direct link to the video file which you inspected from the Instagram multireel
    $url = "https://scontent-sjc3-1.cdninstagram.com/v/t50.2886-16/333350818_605316164744103_3047548513347287896_n.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLjQ4MC5jYXJvdXNlbF9pdGVtLmJhc2VsaW5lIiwicWVfZ3JvdXBzIjoiW1wiaWdfd2ViX2RlbGl2ZXJ5X3Z0c19vdGZcIl0ifQ&_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=103&_nc_ohc=FXz0A4TXm0gAX-65SS6&edm=ALQROFkBAAAA&vs=5918845071542470_3199349661&_nc_vs=HBkcFQAYJEdLS0gzaE9uOC1rbWlDWUNBRmk3MWUwNUVVc3Fia1lMQUFBRhUAAsgBACgAGAAbAYgHdXNlX29pbAEwFQAAJqb%2FjJfGlZhBFQIoAkMzLBdAHMzMzMzMzRgSZGFzaF9iYXNlbGluZV8yX3YxEQB17gcA&ccb=7-5&oh=00_AfBrngzf4hbCCisKevWZm7CZlTGtDNHP7nwwddwEY8KAbQ&oe=64019EAC&_nc_sid=30a2ef";

    $curl = curl_init();
    $timeout = 30;
    $ret = "";
    curl_setopt ($curl, CURLOPT_URL, $url);
    curl_setopt ($curl, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt ($curl, CURLOPT_MAXREDIRS, 20);
    curl_setopt ($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt ($curl, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; rv:1.9.0.5) Gecko/2008120122 Firefox/3.0.5");
    curl_setopt ($curl, CURLOPT_CONNECTTIMEOUT, $timeout);
    $data = curl_exec($curl);
    // echo $data;

    echo '<div content="Content-Type: video/mp4">
<video width="366" height="455" controls="controls" poster="image" preload="metadata">
<source src="data:video/mp4;base64,'.base64_encode($data).'"/>;
</video>
</div>';

    ?>
    ```

## Clipping

You may clip a Youtube video that's too long. Often you may encounter a workout video that has multiple exercises and you only need a clip of that video to explain the exercise. You can clip a Youtube video with either format: by timemark or seconds.

By timemarks:
```
YOUTUBE https://www.youtube.com/watch?v=lETF5JRgEN8 7:16 8:20
```

By seconds:
```
YOUTUBE https://www.youtube.com/watch?v=lETF5JRgEN8 436 500
```

Note that clipping Youtube shorts are not supported.

### Clipping Support

- Youtube Videos