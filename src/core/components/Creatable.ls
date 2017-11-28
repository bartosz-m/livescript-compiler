import
    \../symbols : { create, init }


export default Creatable =
    (Symbol.has-instance): -> Object.is-prototype-of ...
    (create): ->
        ^^@
            ..[init] ...&