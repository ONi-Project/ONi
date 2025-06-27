import type * as foo from './foo'
import type * as bar from './bar'

import { is } from 'ts-runtime-checks'

type Foo =
    | foo.potato
    | foo.car
type Bar =
    | bar.person
    | bar.milk

type all =
    | Foo
    | Bar

export function validate<T>(object: any) {
    return is<T>(object)
}

validate<foo.potato>({ name: 'potato', color: 'brown', weight: 1.2 }) // true
validate<foo.car>({ make: 'Toyota', model: 'Camry' }) // true
validate<String>("hello")