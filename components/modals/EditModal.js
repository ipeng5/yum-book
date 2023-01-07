import { motion } from 'framer-motion';
import EditRecipeForm from '../forms/EditRecipeForm';
import { UserAuth } from '../../context/AuthContext';

function EditModal({ closeModal, meal }) {
  const { user } = UserAuth();

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full flex justify-center items-center">
      <div className="header-space bg-white rounded space-y-10 shadow-md w-[600px] lg:w-[800px] p-8 md:p-10 xl:p-14 mx-4">
        <h2 className="form-title !pb-0">Edit recipe</h2>
        <EditRecipeForm closeModal={closeModal} meal={meal} uid={user.uid} />
      </div>
    </motion.main>
  );
}

export default EditModal;
