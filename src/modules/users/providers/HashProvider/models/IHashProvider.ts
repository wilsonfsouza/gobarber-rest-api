export default interface IHashProvider {
  generateHash(paylod: string): Promise<string>;
  compareHash(payload: string, hashed: string): Promise<boolean>;
}
