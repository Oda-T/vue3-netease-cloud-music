const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
// const requireAll = requireContext => requireContext.keys().forEach(requireContext)
requireAll(req)
