import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import ABI from "ethereumjs-abi";

export const getProof = (data, selectUser) => {
  let proof = "";
  if (data && data.length > 0 && selectUser && selectUser.user && selectUser.reward) {
    const elements = data.map((e) => {
      return keccak256(ABI.solidityPack(["address", "uint256"], [e.user, e.reward]));
    });
    const tree = new MerkleTree(elements, keccak256, { sort: true });
    const leaf = keccak256(
      ABI.solidityPack(["uint256", "address", "uint256"], [selectUser.user, selectUser.reward])
    );
    const resultProof = tree.getHexProof(leaf);
    proof = resultProof;
  }
  return proof;
};
