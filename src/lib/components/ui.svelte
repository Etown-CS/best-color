<script>
	export let name = 'ui1';
	export let name2 = 'radio';
</script>

<div class="tabs tabs-box">
	<input type="radio" {name} class="tab" checked="checked" aria-label="Inputs" />
	<div class="tab-content bg-base-100 border-base-300 p-6">
		<button class="btn btn-primary">Button</button>
		<input type="checkbox" checked="checked" class="toggle toggle-primary" />
		<input type="checkbox" checked="checked" class="checkbox checkbox-primary" />
		<input type="radio" name={name2} class="radio radio-primary" checked="checked" />
		<input type="radio" name={name2} class="radio radio-primary" />
	</div>
	<input type="radio" {name} class="tab" aria-label="Tab 2" />
	<div class="tab-content bg-base-100 border-base-300 p-6">Tab content 2</div>
	<input type="radio" {name} class="tab" aria-label="Tab 3" />
	<div class="tab-content bg-base-100 border-base-300 p-6">Tab content 3</div>
</div>
