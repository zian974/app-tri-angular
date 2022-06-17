import { User, UserModel } from './user.model';

describe('UserModel', () => {

  let userModel: UserModel;
  let userData: UserModel = {
      id: 8,
      nom: "Valjean",
      prenom: "jean",
      email: "jean.valjean@gmail.com",
      abbr: "JEAVAL"
  }

  beforeEach(() => {
  });

  it('should create an instance', () => {
    expect(new UserModel()).toBeTruthy();
  });


  it('should set UserModel', () => {

    userModel = new UserModel(userData);

    expect(userModel.id).toEqual(8);
    expect(userModel.nom).toEqual("Valjean");
    expect(userModel.prenom).toEqual("jean");
    expect(userModel.email).toEqual("jean.valjean@gmail.com");
    expect(userModel.abbr).toEqual("JEAVAL");

  });

});
