# Workout Notebooks

By Weng Fei Fung. 


![Last Commit](https://img.shields.io/github/last-commit/Siphon880gh/workout-notebook-player/main)
<a target="_blank" href="https://github.com/Siphon880gh" rel="nofollow"><img src="https://img.shields.io/badge/GitHub--blue?style=social&logo=GitHub" alt="Github" data-canonical-src="https://img.shields.io/badge/GitHub--blue?style=social&logo=GitHub" style="max-width:10ch;"></a>
<a target="_blank" href="https://www.linkedin.com/in/weng-fung/" rel="nofollow"><img src="https://camo.githubusercontent.com/0f56393c2fe76a2cd803ead7e5508f916eb5f1e62358226112e98f7e933301d7/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c696e6b6564496e2d626c75653f7374796c653d666c6174266c6f676f3d6c696e6b6564696e266c6162656c436f6c6f723d626c7565" alt="Linked-In" data-canonical-src="https://img.shields.io/badge/LinkedIn-blue?style=flat&amp;logo=linkedin&amp;labelColor=blue" style="max-width:10ch;"></a>
<a target="_blank" href="https://www.youtube.com/user/Siphon880yt/" rel="nofollow"><img src="https://camo.githubusercontent.com/0bf5ba8ac9f286f95b2a2e86aee46371e0ac03d38b64ee2b78b9b1490df38458/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f596f75747562652d7265643f7374796c653d666c6174266c6f676f3d796f7574756265266c6162656c436f6c6f723d726564" alt="Youtube" data-canonical-src="https://img.shields.io/badge/Youtube-red?style=flat&amp;logo=youtube&amp;labelColor=red" style="max-width:10ch;"></a>

Curate your folders of workout MD files and be able to view a workout as a slideshow or accordion with video instructions.

## At a Glance

This is a great tool if you like to edit workouts in MD files. You can organize your MD files into folders and subfolders however you want to organize it (Eg. Workout type -> Body Part). You can do resistance training / cardio / stretching / mobility / etc because as long as you follow the formatting rules in MD, it can be time based or rep based. You can incorporate Youtube etc clips and it'll be part of an accordion or slideshow so you can watch the exercise instructions on an iPad.

What this is not is a workout logging app. Towards the end of the road map, I might add logging ability.

## Where to Place

Your folders/subfolders/MD files should be placed in /data/workouts

## How to update the notebook

You'll have to run a command to update the Notebook when you change your workout file structure until I implement a server later in the roadmap. However, updating your workout content doesn't require an update command. The updating is for file and foleder structure. For example, if you renamed a file or you moved a file elsewhere, you'll need to update the app. In a future milestone, by using a server this React app will automatically update to the MD files and folders you have. To update the app, just run `npm run start`.

## Follow the MD format:

Format
```
<exercise_title>
PICTURE <gif/etc link> <optional_width_px_or_other_unit_or_na> <optional_height_px_or_other_unit_or_na>
PICTURE <gif/etc link>
VIDEO yt/etc <timemark_or_na> <timemark_or_na>
DETAIL <your_text>
DETAIL <your_text>
INTERVAL <ready_duration_or_na> <duration> <rest_duration_or_na>
SET <reps> <rest_duration>
SET <reps> <rest_duration>
```

Example
```
<exercise_title>
PICTURE <gif/etc link>
PICTURE <gif/etc link>
VIDEO yt/etc 3:01 na
DETAIL <your_text>
DETAIL <your_text>
INTERVAL 5s 30s na
SET 5r 30s
SET 5r na
```

- Picture is a link like`https://link-to-pic`
- Video is a Youtube link like `https://wwww.youtube.com/...`. Only Youtube videos supported for now. You can clip the video where the exercise instruction is.
- After Video separated by spaces, you have a Video Times to set the playing start time and end time. If you don't want an end time and have the video play through from custom start time to end of video: TIME na. To have it start from beginning and end at a specific time: na TIME. Other scenarios possible as well, but make sure to use na if a time isn't applicable. Time format is MM:SS like 3:01.
- Detail is your paragraph of explanation. You can have as many as possible on different lines.
- Then you have either ROUND or SET. You can have many as possible on different lines. To explain further:
- Round is Getting ready duration, Active duration, and Rest period after
- Set is reps and rest period (can be s, m, or a mix. Eg. 30s, Eg. 1m, Eg. 1m30s). Make sure with mixed time units, that they are together with no spaces (Eg. 1m30s); otherwise what's after the space is ignored.
