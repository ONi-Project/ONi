const curriedCreateMessage = (fixedM) => {
    return function (type, ...args) {
        const data = args[0];
        if (args.length === 2) {
            const target = args[1];
            return {
                type: type,
                data: data,
                target: target
            };
        }
        return {
            type: type,
            data: data
        };
    };
};
export let newServerToWebMessage = curriedCreateMessage({});
export let newWebToServerMessage = curriedCreateMessage({});
export let newServerToOcMessage = curriedCreateMessage({});
export let newOcToServerMessage = curriedCreateMessage({});
export let newGeneralMessage = curriedCreateMessage({});
