export class Optional<T> {
	private constructor(private readonly value: T) {}

	private static readonly EMPTY: Optional<any> = new Optional(null);

	public static of<S>(value: S | null | undefined): Optional<S> {
		if (value) {
			return new Optional(value);
		}
		return this.empty();
	}

	public static empty(): Optional<any> {
		return this.EMPTY;
	}

	map<S>(mapper: (value: T) => S): Optional<S> {
		if (this.isPresent()) {
			return Optional.of(mapper(this.value));
		}
		return Optional.empty();
	}

	isPresent(): boolean {
		return this !== Optional.empty();
	}

	orElse(supplier: () => T): T {
		if (this.isPresent()) {
			return this.value;
		}
		return supplier();
	}
}

export function opOf<S>(value: S) {
	return Optional.of(value);
}
