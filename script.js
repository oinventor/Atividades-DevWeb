const completeProgressButton = document.querySelector('#completeProgressButton');
const progressBar = document.querySelector('#progressBar');
const progressTrack = progressBar.parentElement;
const progressValue = document.querySelector('#progressValue');

completeProgressButton.addEventListener('click', () => {
	progressBar.classList.add('complete');
	progressTrack.setAttribute('aria-valuenow', '100');
	progressValue.textContent = '100%';
	completeProgressButton.textContent = 'Pronto para Procrastinar';
	completeProgressButton.disabled = true;
});
