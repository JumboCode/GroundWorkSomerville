# a config for handling dependencies on NixOS
with import <nixpkgs> {};

let django_heroku = python38Packages.buildPythonPackage rec {
  pname = "django-heroku";
  version = "0.3.1";

  src = python38Packages.fetchPypi {
    inherit pname version;
    sha256 = "0kji15h9z94z7pwcksqscri2fbcq314idrfvssm5xdd9whxbrx3a";
  };
  
  propagatedBuildInputs = with python38Packages; [
    whitenoise
    dj-database-url
    psycopg2
    django
  ];
  
  doCheck = false;
};

customPython = python38.buildEnv.override {
  extraLibs = [ django_heroku ];
};

unstable = import <unstable> {};

in stdenv.mkDerivation {
  name = "env";
  buildInputs = with python38Packages; [
    python3
    yarn
    pip
    django
    djangorestframework
    whitenoise
    gunicorn
    setuptools
    postgresql
    django_heroku
  ] ++ [
   unstable.python38Packages.pillow
  ];
}
