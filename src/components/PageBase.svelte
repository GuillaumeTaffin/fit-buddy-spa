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
        @apply flex flex-col h-full w-full;
    }

    .navbar {
        @apply basis-14;
        @apply flex justify-between items-center;
        @apply shadow;
    }

    .title {
        @apply text-xl font-bold tracking-wider;
        @apply ml-5;
    }

    .body {
        @apply flex-grow;
    }
</style>