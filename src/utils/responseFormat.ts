export function ResponseFormat(code: number, message: string) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const data = await originalMethod.apply(this, args);
      return { code, message, data };
    };
  };
}
