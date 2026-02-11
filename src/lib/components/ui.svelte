<script>
	export let name = 'ui1';
	export let name2 = 'radio';
	export let pagination = 'page';
</script>

<div class="box">
	<div class="bg-base-100 border-base-300 p-6">
		<button class="btn btn-primary">Button</button>
		<input type="checkbox" checked="checked" class="toggle toggle-primary" />
		<input type="checkbox" checked="checked" class="checkbox checkbox-primary" />
		<input type="radio" name={name2} class="radio radio-primary" checked="checked" />
		<input type="radio" name={name2} class="radio radio-primary" />
	</div>
	<div class="bg-base-100 border-base-300 p-6">
		<div class="join">
			<input
				class="join-item btn btn-square"
				type="radio"
				name={pagination}
				aria-label="1"
				checked="checked"
			/>
			<input class="join-item btn btn-square" type="radio" name={pagination} aria-label="2" />
			<input class="join-item btn btn-square" type="radio" name={pagination} aria-label="3" />
			<input class="join-item btn btn-square" type="radio" name={pagination} aria-label="4" />
		</div>
	</div>
	<div class="bg-base-100 border-base-300 p-6">
		<div class="indicator">
			<span class="indicator-item badge badge-primary">New</span>
			<div class="bg-base-300 grid h-12 w-22 place-items-center">content</div>
		</div>
	</div>
</div>
