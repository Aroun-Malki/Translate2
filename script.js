document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('.Contain video');

    videos.forEach(video => {
        const playButton = document.createElement('button');
        playButton.className = 'play-button';
        playButton.innerHTML = '►';
        video.parentElement.appendChild(playButton);

        const progressBarContainer = document.createElement('div');
        progressBarContainer.className = 'progress-bar-container';
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBarContainer.appendChild(progressBar);
        video.parentElement.appendChild(progressBarContainer);

        const confirmationPopup = document.createElement('div');
        confirmationPopup.className = 'confirmation-popup';
        confirmationPopup.innerHTML = `
            <p class="popup-song-name"></p>
            <p class="popup-song-info"></p>
            <button class="confirm">Télecharger</button>
            <button class="cancel">Cancel</button>
        `;
        document.body.appendChild(confirmationPopup);

        const popupOverlay = document.createElement('div');
        popupOverlay.className = 'popup-overlay';
        document.body.appendChild(popupOverlay);

        playButton.addEventListener('click', () => {
            if (video.paused) {
                videos.forEach(v => {
                    if (v !== video) {
                        v.pause();
                        v.parentElement.querySelector('.play-button').innerHTML = '►';
                    }
                });
                video.play();
                playButton.innerHTML = '❚❚';
            } else {
                video.pause();
                playButton.innerHTML = '►';
            }
        });

        video.addEventListener('timeupdate', () => {
            const progress = (video.currentTime / video.duration) * 100;
            progressBar.style.width = `${progress}%`;
        });

        video.addEventListener('play', () => {
            playButton.innerHTML = '❚❚';
        });

        video.addEventListener('pause', () => {
            playButton.innerHTML = '►';
        });

        progressBarContainer.addEventListener('click', (e) => {
            const rect = progressBarContainer.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const newTime = (offsetX / rect.width) * video.duration;
            video.currentTime = newTime;
        });

        const downloadButton = video.parentElement.querySelector('.download-button');
        downloadButton.addEventListener('click', () => {
            const songName = video.parentElement.querySelector('.song-name').textContent;
            const songInfo = video.parentElement.querySelector('.tooltip').innerHTML;
            confirmationPopup.querySelector('.popup-song-name').textContent = songName;
            confirmationPopup.querySelector('.popup-song-info').innerHTML = songInfo;
            confirmationPopup.style.display = 'block';
            popupOverlay.style.display = 'block';
        });

        confirmationPopup.querySelector('.confirm').addEventListener('click', () => {
            const songName = video.parentElement.querySelector('.song-name').textContent;
            const link = document.createElement('a');
            link.href = video.src;
            link.download = `${songName}"Vidéo".mp4`;
            link.click();
            confirmationPopup.style.display = 'none';
            popupOverlay.style.display = 'none';
        });

        confirmationPopup.querySelector('.cancel').addEventListener('click', () => {
            confirmationPopup.style.display = 'none';
            popupOverlay.style.display = 'none';
        });

        popupOverlay.addEventListener('click', () => {
            confirmationPopup.style.display = 'none';
            popupOverlay.style.display = 'none';
        });
    });
});
