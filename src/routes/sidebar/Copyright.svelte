<script lang="ts">
	import { onMount } from 'svelte';

	const defaultContent = 'Made with ❤️ by <b>Centomila</b>';
	const contentArray = [
		'Random reminder to smile 🙂',
		'Random reminder to stretch 💪',
		'Random reminder to drink water 💧',
		'Random reminder to take a breath 🌬️',

		'Here’s a unicorn for you 🦄',
		'Here’s a kitten for you 🐈',
		'Here’s a fox for you 🦊',
		'Here’s a turtle for you 🐢',
		'Here’s a dog for you 🐶',
		'Here’s a hamster for you 🐹',
		'Here’s a panda for you 🐼',
		'Here’s a rabbit for you 🐇',
		'Here’s a koala for you 🐨',
		'Here’s a rainbow for you 🌈',

		'Your lucky numbers are 7, 2, 85 🍀',
		'Your lucky numbers are 29, 9, 56 🍀',
		'Your lucky numbers are 4, 11, 43 🍀',

		'Copyright footers are so fun 🤪',
		'I’ve got your nose! 👃',
		'You’ve found a useless Easter egg! 🎉',
		'Footers are like a box of chocolates... 🍫',
		'You’re doing amazing! 💖',
		'Your pet is looking at you. 🐾',
		'Hans Zimmer would be proud of you! 🎼',
		'A group of cats is called a clowder 🐾',
		'Maybe you like<br/><a href="https://centomila.com/music/music-for-annoyed-robots/" target="_blank" class="anchor">Music for Annoyed Robots</a>? 🎧',
		'Maybe you like<br/><a href="https://centomila.com/music/wrong-techno/" target="_blank" class="anchor">Wrong Techno</a>? 🎧',
		'Maybe you like<br/><a href="https://centomila.com/music/wrong-techno-vol-2/" target="_blank" class="anchor">Wrong Techno, Vol. 2</a>? 🎧',
		'Maybe you like<br/><a href="https://centomila.com/music/question-mark/" target="_blank" class="anchor">Question Mark</a>? 🎧'
	];

	let displayContent: string = defaultContent;

	function updateRandomContent() {
		const randomIndex = Math.floor(Math.random() * contentArray.length);
		displayContent = contentArray[randomIndex];
	}

	onMount(() => {
		document.getElementsByTagName('footer')[0].addEventListener('contextmenu', (event) => {
			event.preventDefault();
			updateRandomContent();
		});
	});
</script>

<footer
	class="bg-surface-200-700-token
		   m-0
		   flex
		   items-center
		   justify-center
		   px-1
		   text-center
		   transition-all
		   duration-300
			hover:bg-surface-700-200-token
			hover:text-surface-50-900-token
			hover:shadow-2xl"
>
	<a
		id="copyright"
		href="https://centomila.com"
		target="_blank"
		title="Click to visit Centomila's website"
		class="
		flex
		h-12
		cursor-pointer
		items-center
		px-2
		text-center
		text-xs
		font-semibold
		transition-all
		duration-300"
	>
		{@html displayContent}
	</a>
</footer>
