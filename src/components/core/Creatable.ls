export default Creatable = 
    create: (arg) ->
          Object.create @
              ..init arg