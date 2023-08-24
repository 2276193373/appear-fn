export function appearFn(selectors, config) {
  const elements = document.querySelectorAll(selectors)
  if (!elements.length) {
    throw new Error('addAnimation function: 获取不到目标元素, 请检查所传的 [选择器名称] 是否正确或 [异步问题]')
  }
  const { appearFn, disappearFn, options, unobserve = true } = config
  const isOptions = 
    Object.prototype.toString.call(options) === '[object Object]' ||
    Object.prototype.toString.call(options) === '[object Undefined]' ||
    Object.prototype.toString.call(options) === '[object Null]'
    
  if (!isOptions) {
    console.error('addAnimation function: options 参数类型必须是对象!')
    options = {}
  } else {
    if (options?.root) {
      const isString = typeof options.root === 'string'
      if (isString) {
        const selector = options.root
        options.root = document.querySelector(selector)
        if (!options.root) {
          throw new Error('options.root: 目标元素不存在')
        }
      }
    }
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        typeof appearFn === 'function' && appearFn(entry.target, io)        
        unobserve && io.unobserve(entry.target)
      } else {
        typeof disappearFn === 'function' &&  disappearFn(entry.target, io)
      }
    })
  }, options)
  
  elements.forEach(el => {
    io.observe(el)
  })
  return io
}