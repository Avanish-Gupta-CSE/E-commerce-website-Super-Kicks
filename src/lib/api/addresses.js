import { supabase } from "../supabase";

export async function getAddresses() {
  const { data, error } = await supabase
    .from("addresses")
    .select("*")
    .order("is_default", { ascending: false });

  if (error) throw error;

  return data.map(normalizeAddress);
}

export async function addAddress({ name, mobileNo, street, city, pincode }) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("addresses")
    .insert({
      user_id: user.id,
      name,
      mobile_no: mobileNo,
      street,
      city,
      pincode,
    })
    .select()
    .single();

  if (error) throw error;

  return normalizeAddress(data);
}

export async function updateAddress(addressId, fields) {
  const updatePayload = {};
  if (fields.name !== undefined) updatePayload.name = fields.name;
  if (fields.mobileNo !== undefined) updatePayload.mobile_no = fields.mobileNo;
  if (fields.street !== undefined) updatePayload.street = fields.street;
  if (fields.city !== undefined) updatePayload.city = fields.city;
  if (fields.pincode !== undefined) updatePayload.pincode = fields.pincode;
  if (fields.isDefault !== undefined) updatePayload.is_default = fields.isDefault;

  const { data, error } = await supabase
    .from("addresses")
    .update(updatePayload)
    .eq("id", addressId)
    .select()
    .single();

  if (error) throw error;

  return normalizeAddress(data);
}

export async function deleteAddress(addressId) {
  const { error } = await supabase
    .from("addresses")
    .delete()
    .eq("id", addressId);

  if (error) throw error;
}

function normalizeAddress(row) {
  return {
    id: row.id,
    name: row.name,
    mobileNo: row.mobile_no,
    address: row.street,
    city: row.city,
    pinCode: row.pincode,
    isDefault: row.is_default,
  };
}
