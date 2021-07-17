export default (el,binding) => {
    const loading = binding.value ?? false
    el.innerHTML = loading ? '<i class="fa fa-spinner fa-spin"></i>' : el.value
    if(loading) el.setAttribute('disabled', true)
    else el.removeAttribute('disabled')
}