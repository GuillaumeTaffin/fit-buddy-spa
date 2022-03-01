<script lang='ts'>
	import Button, { Label } from '@smui/button';
	import Textfield from '@smui/textfield';
	import { AuthPresenter } from './auth.presenter';
	import { getContext } from 'svelte';
	import { Stores, storesKey } from '../stores';

	let stores: Stores = getContext(storesKey);
	const presenter = new AuthPresenter($stores.userStore);

	let email = '';
	let password = '';
	let confirmPassword = '';
	const onSubmit = () => presenter.submit(email, password, confirmPassword);

</script>

<div class='out-wrapper'>
	<div class='wrapper'>
		<h1 class='title'>Welcome to FIT-BUDDY !</h1>
		<form class='auth-form' on:submit|preventDefault={onSubmit}>
			<span class='input-field'><Textfield variant='outlined' bind:value={email} label='E-mail' /></span>
			<span class='input-field'><Textfield variant='outlined' bind:value={password} label='Password'
												 type='password' /></span>
			{#if $presenter.isSignUp}
            <span class='input-field'><Textfield variant='outlined' bind:value={confirmPassword}
												 label='Confirm Password' type='password' /></span>
			{/if}

			<span class='w-submit-button'><span class='submit-button'><Button variant='unelevated'>
            <Label>SUBMIT</Label>
        </Button></span></span>
		</form>
	</div>

	<div class='switch-context'>
		<p>{$presenter.switchContextMessage} </p>
		<Button class='switch-context-button' ripple={false}
				on:click={presenter.switchContext}>{$presenter.switchContextButtonText}</Button>
	</div>

</div>


<style>
    .out-wrapper {
        @apply flex flex-col;
        @apply h-full;
        @apply p-2;
    }

    .wrapper {
        @apply flex-grow;
        @apply space-y-2;
        @apply flex flex-col items-center items-stretch justify-center;
    }

    .title {
        @apply text-2xl;
        @apply pb-2;
    }

    .auth-form {
        @apply flex flex-col space-y-2;
    }

    .input-field {
        @apply flex flex-col;
    }

    .w-submit-button {
        @apply flex justify-center;
    }

    .submit-button {
        @apply flex flex-col w-full max-w-xs;
    }

    .switch-context {
        @apply flex flex-none justify-center;
        @apply mb-4;
        @apply text-sm;
    }

    .switch-context p {
        @apply flex  items-center;
    }

    * :global(.switch-context-button) {
        @apply italic mx-4 text-sm bg-transparent;
    }

</style>
