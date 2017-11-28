import 
    \./symbols : { copy }

export default AbstractNode = ^^null
AbstractNode <<<
    (copy): -> throw Error "Cannot copy. Node doesn't implement method copy"
