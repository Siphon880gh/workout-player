# Workoute Notebook Player
## Automate Exercise Video and Picture Links into a Workout Session

By Weng Fei Fung. 


![Last Commit](https://img.shields.io/github/last-commit/Siphon880gh/workout-notebook-player/main)
<a target="_blank" href="https://github.com/Siphon880gh" rel="nofollow"><img src="https://img.shields.io/badge/GitHub--blue?style=social&logo=GitHub" alt="Github" data-canonical-src="https://img.shields.io/badge/GitHub--blue?style=social&logo=GitHub" style="max-width:10ch;"></a>
<a target="_blank" href="https://www.linkedin.com/in/weng-fung/" rel="nofollow"><img src="https://camo.githubusercontent.com/0f56393c2fe76a2cd803ead7e5508f916eb5f1e62358226112e98f7e933301d7/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c696e6b6564496e2d626c75653f7374796c653d666c6174266c6f676f3d6c696e6b6564696e266c6162656c436f6c6f723d626c7565" alt="Linked-In" data-canonical-src="https://img.shields.io/badge/LinkedIn-blue?style=flat&amp;logo=linkedin&amp;labelColor=blue" style="max-width:10ch;"></a>
<a target="_blank" href="https://www.youtube.com/user/Siphon880yt/" rel="nofollow"><img src="https://camo.githubusercontent.com/0bf5ba8ac9f286f95b2a2e86aee46371e0ac03d38b64ee2b78b9b1490df38458/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f596f75747562652d7265643f7374796c653d666c6174266c6f676f3d796f7574756265266c6162656c436f6c6f723d726564" alt="Youtube" data-canonical-src="https://img.shields.io/badge/Youtube-red?style=flat&amp;logo=youtube&amp;labelColor=red" style="max-width:10ch;"></a>

Saved a bunch of picture links and exercise video links? You might never get to it. But with this app, you're saving the links into text files and the app will create a workout with instructions you can follow along. May add reps and countdowns at the text file for a full workout.

If a video is too long, you can add specific timemarks to the exercise at the text file. The app can play a clip of the video. For a list of supported video links, refer to: Supported Videos.

The idea is that you may not be familiar with these exercises that you collected from picture and video links, but the app can instruct you and get you moving.

## Supported Videos:

- Facebook video (not reel)

- Instagram reel (not multireel)

- TikTok video

- Vimeo video

- Youtube video

- Youtube short

### Timemarks / Clipping Support

- Youtube Videos

## Unsupported Videos

- Facebook Reel 

- Instagram Multireel

For more information on why they are unsupportable by app, refer to Appendix section.

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

## General Format

General format is
```
WORKOUTDESC This is a workout description and is completely optional
WORKOUTDESC You can have as many paragraphs as you need
WORKOUTDESC You can have as many paragraphs as you need
WORKOUTDESC &nbsp;
WORKOUTDESC And you can <a href="https://www.google.com" target="_blank">link out</a>
# ANY COMMENT TO YOURSELF
---

<exercise1_title>
PICTURE <gif/etc link> <optional_width_px_or_other_unit_or_na> <optional_height_px_or_other_unit_or_na> <optional_for_pictures_across:-->
PICTURE <gif/etc link>

YOUTUBE <youtube-link> <timemark_or_seconds_or_na> <timemark_or_seconds_or_na>
YOUTUBESHORT https://www.youtube.com/shorts/oLYM46dWYzM
FBVIDEO
INSTAGRAMREEL
TIKTOK
VIMEO
MISCVIDEO <URL of any videos not supported above. Will try to support inside iframe>

INSTRUCTION <your_text>
INSTRUCTION <your_text>
INTERVAL <ready_duration_or_na> <duration> <rest_duration_or_na>
INTERVAL <ready_duration_or_na> <duration> <rest_duration_or_na>
INTERVAL <ready_duration_or_na> <duration> <rest_duration_or_na>

---

<exercise2_title>
...
SET <reps> <rest_duration>
SET <reps> <rest_duration>
SET <reps> <rest_duration>
```

For example:
```
WORKOUTDESC This is a basics demonstration of the pictures, instructions, intervals, and sets/reps
WORKOUTDESC This workout description can me more than one paragraph/line.
---
Exercise 1
PICTURE https://www.verywellfit.com/thmb/w-hq2ZW1sxMDVJuEdRo8mlBgic8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/About-194-1231474-Chest-Press-Bench02-1560-fe31b6ad47f042c896163a5e1a89e169.jpg 150px na --

PICTURE https://www.verywellfit.com/thmb/w-hq2ZW1sxMDVJuEdRo8mlBgic8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/About-194-1231474-Chest-Press-Bench02-1560-fe31b6ad47f042c896163a5e1a89e169.jpg 150px na --

INSTRUCTION Lie down on a bench... 
INSTRUCTION With feet on the floor, lift... 

INTERVAL 3s 3s 3s
INTERVAL 3s 3s 3s

---
Exercise 2
PICTURE https://www.verywellfit.com/thmb/w-hq2ZW1sxMDVJuEdRo8mlBgic8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/About-194-1231474-Chest-Press-Bench02-1560-fe31b6ad47f042c896163a5e1a89e169.jpg  150px na

PICTURE https://www.verywellfit.com/thmb/w-hq2ZW1sxMDVJuEdRo8mlBgic8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/About-194-1231474-Chest-Press-Bench02-1560-fe31b6ad47f042c896163a5e1a89e169.jpg 150px na

INSTRUCTION Lie down on a bench... 
INSTRUCTION With feet on the floor, lift... 

SET 5r 3s
SET 5r 3s
```

To reiterate, a text file is your workout session from the video links. You may add timemarks if the video has impertinent segments (like a video intro/outro/transitions/B-roll's, other exercises that don't fit yout workout, etc). For Video Timemarks formatting rules, refer to: Video Timemarks Format.

The app will display the workout name from the filename. Each exercise must follow the format of an Exercise name, then any pictures and/or video links, then a set or an interval. Optionally, you may have a section of workout descriptions to explain the workout session under the title, but that section must be at the top of the text file. So in the above format example, you have a workout description section, exercise section, then another exercise section.

Alternately, you could have just all exercise sections and skip the workout descriptions:
```
<exercise1_title>
...

---

<exercise2_title>
...
```

Then the example becomes:
```
Exercise 1
PICTURE https://www.verywellfit.com/thmb/w-hq2ZW1sxMDVJuEdRo8mlBgic8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/About-194-1231474-Chest-Press-Bench02-1560-fe31b6ad47f042c896163a5e1a89e169.jpg 150px na --

PICTURE https://www.verywellfit.com/thmb/w-hq2ZW1sxMDVJuEdRo8mlBgic8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/About-194-1231474-Chest-Press-Bench02-1560-fe31b6ad47f042c896163a5e1a89e169.jpg 150px na --

INSTRUCTION Lie down on a bench... 
INSTRUCTION With feet on the floor, lift... 

INTERVAL 3s 3s 3s
INTERVAL 3s 3s 3s

---
Exercise 2
PICTURE https://www.verywellfit.com/thmb/w-hq2ZW1sxMDVJuEdRo8mlBgic8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/About-194-1231474-Chest-Press-Bench02-1560-fe31b6ad47f042c896163a5e1a89e169.jpg  150px na

PICTURE https://www.verywellfit.com/thmb/w-hq2ZW1sxMDVJuEdRo8mlBgic8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/About-194-1231474-Chest-Press-Bench02-1560-fe31b6ad47f042c896163a5e1a89e169.jpg 150px na

INSTRUCTION Lie down on a bench... 
INSTRUCTION With feet on the floor, lift... 

SET 5r 3s
SET 5r 3s
```


All sections whether they are workout description section or an exercise section, must be separated with a line of `---`. You can have as many dashes as you want but it must have at least three dashes.

When it comes to the video link, video platform will require "FBVIDEO" or "YOUTUBE" or "YOUTUBESHORT" etc. This is because their embed or viewing logic is different than usual and my app needs to know which strategy to use. In the future, the app will look at the URL and determine the type of video playing algorithm to use automatically, however I am short on time right now. "MISCVIDEO" will try to fit video in an iframe if it's none of the supported platforms.

Your SET or INTERVAL is how you perform the exercise. If it's an INTERVAL, it will count down for the duration of your exercise (usually cardio or stretching). If it's a SET, you click the the DONE button after you complete the number of reps it displays. If you have INTERVAL, that exercise must not contain SET. If you have SET, that exercise must not contain INTERVAL. This is for scalability reasons if in the future there will be more complicated logic involving the exercise's activity.

You may add comments by starting a line with `#`


To summarize:
- You have an exercise sections separated by ---
- First line always is title of exercise. Mandatory.
- PICTURE is a link like `https://link-to-pic` to your picture file; may be self-hosted or on another website. Optional. Can have as many as you want.
- INSTRUCTION is your explanation paragraph. Optional. Can have as many as you want.
- INTERVAL is if your exercise activity requires a counting down. Briefly, the format is: Getting ready-duration, Active duration, and Rest period after. For formatting, refer to: Activity Duration/Countdown Format
- SET is if your exercise activity requires reps to be done. Briefly, the format is: number of reps and rest period. For formatting, refer to: Activity Duration/Countdown Format
- You may add comments by starting a line with `#`

Remember no mixing sets and intervals in the same exercise. The app will warn you and mention which one it will ignore if you mix in different activity types for the same exercise.

Any line that doesn't make sense will just not show up in the app. Most lines should have a keyword at the start, or is a separator ---, and if there's no keyword then it's the first line of the exercise - the exercise title.

## Workout Description

You can have two paragraphs in the workout description:

```
WORKOUTDESC Paragraph
WORKOUTDESC 
WORKOUTDESC Paragraph
```

## Picture Format

Basic format is:
```
PICTURE <gif/etc link>
```

Optionally indicate your own custom dimensions:
```
PICTURE <gif/etc link> <optional_WIDTH_px_etc_or_na_or_auto> <optional_HEIGHT_px_etc_or_na_or_auto> 
```

For the custom width and heights of the pictures, they are optional. They can be in %, px, vw, etc following CSS rules (Eg. 100px, 100%, 50%, 50vw). Look into Sample files for examples. If you only need a custom height, however, you will need something at the width because the app reads in the width and height if provided in a certain order. You can use "na" or "auto" in place of a custom width when adding a custom height. Auto will keep the aspect ratio of the original picure relative to a custom height or width. If you only need a custom width, then you can skip the "na" or "auto" for height because the app will use common sense parsing rules.

Have multiple pictures? You can have multiple pictures in one line if fit (the default is a picture per line):
```
PICTURE <gif/etc link> <optional_WIDTH_px_etc_or_na_or_auto> <optional_HEIGHT_px_etc_or_na_or_auto> --
```

Notice you add "--" at the end of the PICTURE line. If you want pictures to be across each other instead of below each other, you want to place "--" at the end of the PICTURE line, and remember that it's at the final position separated by spaces, so if you don't have custom width and/or height you have to place "na" or "auto" in their place(s).

## Video Format:

- YOUTUBE is a Youtube link like `https://wwww.youtube.com/...`. 
    - For Youtube videos, you can clip the video where the exercise instruction is by providing a start timemark or start and end timemarks. A timemark is like 1:00.
    - After YOUTUBE separated by spaces, you have a Video Times to set the playing start time and end time. If you don't want an end time and have the video play through from custom start time to end of video: TIME na. To have it start from beginning and end at a specific time: na TIME. Briefly, the TIME can be timemark like MM:SS, or in seconds like 10s. For more details, refer to Video Timemarks Format.
- YOUTUBESHORT is a Youtube short link like `https://wwww.youtube.com/shorts/...`. Clipping a start/end time is not supported.
- FBVIDEO <url>
- INSTAGRAMREEL <url>
- TIKTOK <url>
- VIMEO <url>
- MISCVIDEO <URL of any videos not supported above. Will try to support inside iframe>

FBVIDEO is used to distinguish from the now unsupported FBREEL (Facebook now blocks you).

Remember that the app only supports unlisted or public videos. Even if your private Vimeo video has the hash "h" URL query, it will not be supported.

## Video Timemarks Format

You may clip a Youtube video that's too long. Often you may encounter a workout video that has multiple exercises and you only need a clip of that video to explain the exercise. You can clip a Youtube video with either format: by timemark or seconds.

By timemarks:
```
YOUTUBE https://www.youtube.com/watch?v=lETF5JRgEN8 7:16 8:20
```

By seconds:
```
YOUTUBE https://www.youtube.com/watch?v=lETF5JRgEN8 436 500
```

Note that clipping Youtube shorts are not supported. Clipping the other types of media (FBVideo, etc) are also not supported. Will implement if there's interest shown in the app.

## Activity Duration/Countdown Format:
- When it comes to the exercise activity's durations/countdowns.
- Can be s, m, or a mix. If mixing the units, make sure there is no space (because the app relies on spaces to parse different information)
- Eg. 30s, Eg. 1m, Eg. 1m30s.

## Appendix: More on Unsupported Videos:

- Facebook reel 

Was previously thought to be supported with
`FBREEL <video_clip_you_extracted> <audio_clip_you_extracted>`

Workout preparer would require additional steps using Chrome DevTools' Inspect to get the proper URLs of both video and audio clips that Facebook played synchronously.

However at a much later time, "URL signature expired" would output from their server.

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

echo '<div content="Content-Type: video/mp4"><video width="366" height="455" controls="controls" poster="image" preload="metadata"><source src="data:video/mp4;base64,'.base64_encode($data).'"/>;</video></div>';
?>
```

## Appendix: Architecture

This app uses React-Router-Dom for SPA dynamic rendering and Redux for state management.

When you run `npm run start` it first runs update-paths.js which will create a paths.json file that represents all your folders and text files of workouts from `public/data/notebooks`. The paths.json is created at root, then copied over to /src so that the components have access (all components will simply be in /src). Then it starts the create-react-app.

App.js will render a FileNavigator on the left and FileViewer on the right. The FileNavigator loads this paths.json and takes care of presenting the workouts and categories to the user and the UI logic. The UI logic includes expanding folders, collapsing folders, switching to a file. SetReenderCode forces the DOM to diff so that it gets re-rendered.

FileViewer.js takes over once a text file (workout) is clicked from the FileNavigator. Based on the folder nesting and filename from the File Navigator, the actual txt file gets fetched by fetchAndParseWorkout. Then workout date is parsed from that text file by parseWorkoutData which is from FileViewer.Utils.js. 

When parsing workout data, it'll break up the textfile into sections aka groups (it's called groups in the code). The groups could be workout description section and exercise section(s). Or it could just be exercise sections because the workout description section is optional.

For every exercise section/group, it would filter lines that start with MISCVIDEO, YOUTUBE, YOUTUBESHORT, VIMEO, PICTURE, INSTRUCTION, SET, or INTERVAL, for example. Those different lines will be returned from FileViewer.Utils.js:parseWorkoutData to FileViewer.js as an object of youtube link array, instructions array, etc. Some of those arrays may be blank if not applicable - for example - an exercise not having any instruction lines. We will come back to this object of arrays in a bit.

At FileViewer.js, you have a ConnectedExercise component which is a wrapper around Exercise component. You have a ConnectedWorkout component which is a wrapper around Workout component. Remember that in Redux, connected components give the stores access to the component's props. 

The workout component is basically a page that contains exercise components. The exercise component may contain smaller components: Facebook Reel component(s), Youtube Reel component(s), Picture component(s), Instructions component(s), Set or Interval component(s), etc. 

Those smaller components are rendered based on the object of arrays that was parsed from an exercise section in the text file: Youtube videos link(s), Facebook Reel link(s), Picture link(s), Instruction(s), Set/Interval(s), etc. 

The smaller components JSX are imported into FileViewer.js from FileViewer.Types.js. At FileViewer.Types.js, a component has access to their lines from the textfile. Further parsing is done to figure out details such as whether clipping should be done to a video.

For example, a video with timemarks for start and end will produce a shorter video for the workout app:
```
YOUTUBE https://www.youtube.com/watch?v=lETF5JRgEN8 7:16 8:20
```

The FileViewer.Types.js components also take care of the Redux logic involving which exercise you are at, countdown timers, which set you are at, etc that the user sees and interacts with. 

At FileViewer.Types.js, the store and its contained dispatch method was passed down as a prop from FileViewer.js at every component. There at FileViewer.js, the reducer configured to the store is also defined. The reducer is not in a separate file and is defined on the spot at FileViewer.js.

Going over the reducer, the actions are labeled at the workout level vs exercise level vs interval level vs round level. A round is basically a set where reps are done.

Of particular note, "exercise/incremented" takes care of UI state where you are going to the next exercise because the app is done playing an exercise.

The "workout-finished" renders that you are done with the workout, usually when the app incremented from the final exercise.

The "interval/countdown/..." takes care of logic for interval based exercise activities. An interval based exercise could be stretching or cardio for a certain duration. There are three types of intervals that this group of reducers manage: ready duration, active duration, rest duration.

The "round/..." takes care of logic for set-reps based exercise activities. Each set has a number of reps then a rest duration. The user sees the number of reps and clicks the button "DONE X Reps".

That describes the basic architecture and control flow of the app.