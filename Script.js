class AVLTree {
    constructor() {
        this.root = null;
    }

    getHeight(node) {
        if (node === null) {
            return -1;
        }
        return Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    }

    getBalanceFactor(node) {
        return this.getHeight(node.left) - this.getHeight(node.right);
    }

    rightRotation(node) {
        const newRoot = node.left;
        node.left = newRoot.right;
        newRoot.right = node;
        return newRoot;
    }

    leftRotation(node) {
        const newRoot = node.right;
        node.right = newRoot.left;
        newRoot.left = node;
        return newRoot;
    }

    balance(node) {
        const balanceFactor = this.getBalanceFactor(node);
        if (balanceFactor > 1) {
            if (this.getBalanceFactor(node.left) < 0) {
                node.left = this.leftRotation(node.left);
            }
            return this.rightRotation(node);
        }
        if (balanceFactor < -1) {
            if (this.getBalanceFactor(node.right) > 0) {
                node.right = this.rightRotation(node.right);
            }
            return this.leftRotation(node);
        }
        return node;
    }

    insert(name, pokemon) {
        const node = new Node(name.toUpperCase(), pokemon);
        if (this.root === null) {
            this.root = node;
        } else {
            this.root = this._insert(this.root, node);
        }
    }

    _insert(node, newNode) {
        if (node === null) {
            return newNode;
        }
        if (newNode.name < node.name) {
            node.left = this._insert(node.left, newNode);
        } else if (newNode.name > node.name) {
            node.right = this._insert(node.right, newNode);
        } else {
            node.pokemon = newNode.pokemon;
        }
        return this.balance(node);
    }

    search(name) {
        let node = this.root;
        while (node !== null) {
            if (name < node.name) {
                node = node.left;
            } else if (name > node.name) {
                node = node.right;
            } else {
                return node.pokemon;
            }
        }
        return null;
    }

    print() {
        const result = [];
        function traverse(node) {
            if (node !== null) {
                traverse(node.left);
                result.push(`ID:${node.pokemon.id} Name: ${node.pokemon.name}, Weight: ${node.pokemon.weight}, Height: ${node.pokemon.height}`);
                traverse(node.right);
            }
        }
        traverse(this.root);
        console.log(result.join('\n'));
    }
}

class Node {
    constructor(name, pokemon) {
        this.name = name;
        this.pokemon = pokemon;
        this.left = null;
        this.right = null;
    }
}

class Pokemon {
    constructor(abilities, detailPageURL, weight, weakness, number, height, collectibles_slug, featured, slug, name, ThumbnailAltText, ThumbnailImage, id, type) {
        this.abilities = abilities;
        this.detailPageURL = detailPageURL;
        this.weight = weight;
        this.weakness = weakness;
        this.number = number;
        this.height = height;
        this.collectibles_slug = weight;
        this.featured = weakness;
        this.slug = slug;
        this.name = name;
        this.ThumbnailAltText = ThumbnailAltText;
        this.ThumbnailImage = ThumbnailImage;
        this.id = id;
        this.type = type;
    }
}

const pokemonData = JSON.parse(poke_file).result;

const pokedex = new AVLTree();
for (const pokemon of pokemonData) {
    const newPokemon = new Pokemon(pokemon.abilities, pokemon.detailPageURL, pokemon.weight, pokemon.weakness, pokemon.number, pokemon.height, pokemon.collectibles_slug, pokemon.featured, pokemon.slug, pokemon.name, pokemon.ThumbnailAltText, pokemon.ThumbnailImage, pokemon.id, pokemon.type);
    pokedex.insert(newPokemon.name, newPokemon);
}

let input_character_name = document.getElementById("input_character_name")
let container = document.getElementById("container")

function search_character_button_click() {
    const pokemon = pokedex.search(input_character_name.value.toUpperCase());
    pokedex.print();

    container.innerHTML =
        `<p>
      <span>Number: ${pokemon.id}</span><br />
      <span>Name: ${pokemon.name}</span><br />
      <span>Abilities: ${pokemon.abilities} </span><br />
      <span>Weight: ${pokemon.weight}</span><br />
      <span>Height: ${pokemon.height}</span><br />
      <span> Weakness: ${pokemon.weakness} </span><br />
      <span> Type: ${pokemon.type} </span><br />
      <img src="${pokemon.ThumbnailImage}"/>
        </p>`
}

