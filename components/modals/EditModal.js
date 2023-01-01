import EditRecipeForm from '../forms/EditRecipeForm';
import { UserAuth } from '../../context/AuthContext';

export function EditModal({ closeModal, meal }) {
  const { user, authIsReady } = UserAuth();

  return (
    <div className="bg-white px-20 py-10 rounded flex flex-col justify-center items-center gap-6 shadow-xl">
      <EditRecipeForm uid={user.uid} closeModal={closeModal} meal={meal} />
    </div>
  );
}
