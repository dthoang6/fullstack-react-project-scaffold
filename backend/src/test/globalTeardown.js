// Stop the MongoDB instance when our tests are finished

export default async function globalTeardown() {
  await globalThis.__MONGOINSTANCE.stop()
}
