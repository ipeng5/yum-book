import EditRecipeForm from '../forms/EditRecipeForm';
import { UserAuth } from '../../context/AuthContext';

function EditModal({ closeModal, meal }) {
  const { user } = UserAuth();

  return (
    <div className="bg-white px-20 py-10 w-[1000px] flex flex-col justify-center items-center gap-6 shadow-xl">
      <h2 className="text-4xl text-primary-normal text-center font-semibold pb-4">
        Edit recipe
      </h2>
      <EditRecipeForm closeModal={closeModal} meal={meal} uid={user.uid} />
    </div>
  );
}

export default EditModal;
