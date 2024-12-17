export class Perhaps<T, E = Error> {
    private readonly value?: T;
    private readonly error?: E;

    private constructor(value?: T, error?: E) {
        this.value = value;
        this.error = error;
    }

    // Static factory methods to create instances
    static Of<T, E = Error>(value: T): Perhaps<T, E> {
        return new Perhaps(value, undefined) as Perhaps<T, E>; // Success, no error
    }

    static OfError<T, E = Error>(error: E): Perhaps<T, E> {
        return new Perhaps(undefined, error) as Perhaps<T, E>; // Failure, with error
    }

    // Check if the Option contains a valid value
    hasValue(): boolean {
        return this.value !== undefined;
    }

    // Check if the Option contains an error
    hasError(): boolean {
        return this.error !== undefined;
    }

    // Get the value (throws if there's no value)
    get(): T {
        if (this.value === undefined) {
            throw new Error(`Called unwrap() on a None value. Error: ${this.error}`);
        }
        return this.value;
    }

    // Get the error (throws if there's no error)
    getError(): E {
        if (this.error === undefined) {
            throw new Error('Called unwrapError() on a Some value');
        }
        return this.error;
    }

    // Get the value or return a default if there's no value
    getOr(defaultValue: T): T {
        return this.value !== undefined ? this.value : defaultValue;
    }

    // Map the value to a new value if it's Some, return None otherwise
    map<U>(fn: (value: T) => U): Perhaps<U, E> {
        if (this.hasValue()) {
            return Perhaps.Of(fn(this.value as T));
        }
        return Perhaps.OfError(this.error as E);
    }

    // If Some, apply a function, otherwise return the current Option
    andThen<U>(fn: (value: T) => Perhaps<U, E>): Perhaps<U, E> {
        if (this.hasValue()) {
            return fn(this.value as T);
        }
        return Perhaps.OfError(this.error as E);
    }
}