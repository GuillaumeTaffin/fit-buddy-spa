<script></script>

<div class='page'>
	<div class='navbar'>
		<p class='title'>FIT-BUDDY</p>
		<ul>
		</ul>
	</div>
	<div class='body'>
		<slot />
	</div>
</div>

<style>
    .page {
        @apply flex flex-col h-full w-full max-h-full;
    }

    .navbar {
        @apply basis-14;
        @apply flex justify-between items-center;
        @apply shadow;
    }

    .title {
        @apply text-lg font-thin tracking-wider;
        @apply ml-4;
    }

    .body {
        @apply flex-grow;
    }
</style>